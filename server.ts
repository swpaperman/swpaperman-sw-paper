import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// Helper function to parse CSV into rows
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell.trim());
        cell = "";
      } else if (char === '\r') {
        // ignore CR
      } else if (char === '\n') {
        row.push(cell.trim());
        if (row.some(c => c.length > 0)) {
          lines.push(row);
        }
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    if (row.some(c => c.length > 0)) {
      lines.push(row);
    }
  }
  return lines;
}

// Convert CSV or 2D array into structured DefenseNewsArticles
function rowsToDefenseNews(headers: string[], rows: string[][]): any[] {
  const normHeaders = headers.map(h => (h || "").toLowerCase().replace(/\s+/g, ""));
  
  const findCol = (keywords: string[]) => {
    return normHeaders.findIndex(h => keywords.some(k => h.includes(k.toLowerCase())));
  };

  // Google Sheet exact header keywords matching
  const colIdx = {
    date: findCol(["기록일자", "일자", "날짜", "date", "게시일"]),
    tab: findCol(["대분류", "탭구분", "tab", "탭", "구분"]),
    category: findCol(["세부사양", "카테고리", "category", "분류"]),
    title: findCol(["뉴스제목", "기사제목", "제목", "title", "헤드라인"]),
    source: findCol(["기사출처", "출처", "source", "언론사", "매체"]),
    url: findCol(["원문링크", "링크주소", "url", "링크", "원문", "link"]),
    imageUrl: findCol(["대표이미지", "이미지", "사진", "image", "img"]),
    summary: findCol(["카드노출요약", "요약(3줄", "요약", "summary", "개요"]),
    coreSummary: findCol(["핵심인텔리전스", "핵심요약", "core", "핵심", "쟁점"]),
    bodyText: findCol(["상세분석", "설명본문", "본문", "body", "내용", "상세"]),
    perspective: findCol(["수원지관산업", "제조·공학", "제조관점", "코멘트", "perspective", "관점", "논평"])
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return rows.map((row, idx) => {
    // Exact index fallback if column headers were position-based (11 standard columns)
    const rawDate = colIdx.date !== -1 ? (row[colIdx.date] || "") : (row[0] || "");
    const rawTab = colIdx.tab !== -1 ? (row[colIdx.tab] || "") : (row[1] || "");
    const rawCategory = colIdx.category !== -1 ? (row[colIdx.category] || "") : (row[2] || "");
    const rawTitle = colIdx.title !== -1 ? (row[colIdx.title] || "") : (row[3] || "");
    const rawSource = colIdx.source !== -1 ? (row[colIdx.source] || "") : (row[4] || "");
    const rawUrl = colIdx.url !== -1 ? (row[colIdx.url] || "") : (row[5] || "");
    const rawImg = colIdx.imageUrl !== -1 ? (row[colIdx.imageUrl] || "") : (row[6] || "");
    const rawSummary = colIdx.summary !== -1 ? (row[colIdx.summary] || "") : (row[7] || "");
    const rawCore = colIdx.coreSummary !== -1 ? (row[colIdx.coreSummary] || "") : (row[8] || "");
    const rawBody = colIdx.bodyText !== -1 ? (row[colIdx.bodyText] || "") : (row[9] || "");
    const rawPersp = colIdx.perspective !== -1 ? (row[colIdx.perspective] || "") : (row[10] || "");

    if (!rawTitle.trim()) return null;

    let tab: "domestic" | "global" | "suwon" = "domestic";
    const lowerTab = rawTab.toLowerCase();
    if (lowerTab.includes("glob") || lowerTab.includes("해외") || lowerTab.includes("글로벌") || rawCategory.includes("글로벌")) {
      tab = "global";
    } else if (lowerTab.includes("suwon") || lowerTab.includes("수원") || rawCategory.includes("수원지관")) {
      tab = "suwon";
    }

    let cleanDate = todayStr;
    if (rawDate) {
      const match = rawDate.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
      if (match) {
        const y = match[1];
        const m = match[2].padStart(2, "0");
        const d = match[3].padStart(2, "0");
        cleanDate = `${y}-${m}-${d}`;
      } else {
        cleanDate = rawDate.trim();
      }
    }

    // Curated high quality defense industry fallback images if omitted in sheet
    let defaultImg = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80";
    if (rawTitle.includes("배터리") || rawTitle.includes("LG") || rawTitle.includes("드론")) {
      defaultImg = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
    } else if (rawTitle.includes("신관") || rawTitle.includes("유도") || rawTitle.includes("미사일")) {
      defaultImg = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80";
    } else if (rawTitle.includes("일본") || rawTitle.includes("정책") || rawTitle.includes("전망") || rawTitle.includes("딜로이트")) {
      defaultImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80";
    } else if (rawTitle.includes("NCAGE") || rawTitle.includes("코드") || rawTitle.includes("공급망")) {
      defaultImg = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80";
    } else if (rawTitle.includes("장갑차") || rawTitle.includes("XM30")) {
      defaultImg = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80";
    } else if (rawTitle.includes("ADD") || rawTitle.includes("국방과학") || rawTitle.includes("보안")) {
      defaultImg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80";
    }

    const finalImg = (rawImg.startsWith("http://") || rawImg.startsWith("https://")) ? rawImg.trim() : defaultImg;
    const finalSummary = rawSummary.trim() || rawBody.slice(0, 120) || rawTitle;

    return {
      id: `news-sheet-${cleanDate.replace(/-/g, '')}-${idx + 1}`,
      tab,
      category: rawCategory.trim() || (tab === "global" ? "글로벌 방산시장" : "국내 방산기업"),
      title: rawTitle.trim(),
      summary: finalSummary,
      source: rawSource.trim() || "K-방산 뉴스 모니터링",
      date: cleanDate,
      url: rawUrl.trim() || "https://kookbang.dema.mil.kr/",
      imageUrl: finalImg,
      coreSummary: rawCore.trim() || finalSummary.slice(0, 80),
      bodyText: rawBody.trim() || rawSummary || rawTitle,
      perspective: rawPersp.trim()
    };
  }).filter(Boolean);
}

// Endpoint to fetch Google Sheet server-side (bypasses CORS & client popup issues)
app.get("/api/defense-news/sheet", async (req, res) => {
  const sheetId = (req.query.sheetId as string) || "1DlMYbO55PuV1PEfeLrIsZJLGUpb2NgySEjZMcYgLY9Q";
  const gid = (req.query.gid as string) || "0";

  try {
    // Attempt 1: Fetch via direct CSV export URL
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    const csvRes = await fetch(csvUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      redirect: 'follow'
    });

    if (csvRes.ok) {
      const csvText = await csvRes.text();
      // Check if redirected to Google Accounts login page
      if (csvText.includes("<html") && (csvText.includes("ServiceLogin") || csvText.includes("accounts.google.com"))) {
        return res.json({
          success: false,
          isPrivate: true,
          error: "구글 시트가 현재 '제한됨(비공개)' 상태입니다. 구글 시트 우측 상단 [공유] 버튼에서 '링크가 있는 모든 사용자 - 뷰어'로 변경하시면 로그인 없이 즉시 100% 자동 동기화됩니다.",
          sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`
        });
      }

      const rows = parseCSV(csvText);
      if (rows.length > 1) {
        const headers = rows[0];
        const dataRows = rows.slice(1);
        const articles = rowsToDefenseNews(headers, dataRows);
        if (articles.length > 0) {
          return res.json({
            success: true,
            articles,
            total: articles.length,
            sheetId,
            source: "csv_export"
          });
        }
      }
    }

    // Attempt 2: Try GViz API
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
    const gvizRes = await fetch(gvizUrl);
    if (gvizRes.ok) {
      const gvizText = await gvizRes.text();
      const match = gvizText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        const cols = (json.table?.cols || []).map((c: any) => c.label || c.id || "");
        const rows = (json.table?.rows || []).map((r: any) => {
          return (r.c || []).map((cell: any) => cell ? (cell.f || cell.v || "") : "");
        });

        if (rows.length > 0) {
          const articles = rowsToDefenseNews(cols, rows);
          if (articles.length > 0) {
            return res.json({
              success: true,
              articles,
              total: articles.length,
              sheetId,
              source: "gviz"
            });
          }
        }
      }
    }

    return res.json({
      success: false,
      isPrivate: true,
      error: "구글 시트가 '제한됨'으로 보호되어 있습니다. 구글 시트에서 [공유] → [링크가 있는 모든 사용자(뷰어)]로 설정하시면 별도의 구글 로그인 없이 즉시 자동 동기화됩니다.",
      sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`
    });
  } catch (err: any) {
    console.error("Server sheet fetch error:", err);
    res.json({
      success: false,
      error: `시트 데이터 수신 중 오류 발생: ${err.message}`
    });
  }
});

// Configure Vite or Static delivery depending on environment
async function setupViteOrStaticAndListen() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted successfully.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Static assets server routes configured under production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Suwon Server] Express server launched successfully, running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStaticAndListen();
