/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TimelineEvent {
  year: string;
  items: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  englishName: string;
  badge: string;
  category: "defense" | "wood" | "eco";
  summary: string;
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  structureLayers?: {
    name: string;
    desc: string;
    color: string;
  }[];
}

export interface CertificateInfo {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  authority: string;
  number: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  productType: string;
  dimensions: string;
  quantity: string;
  message: string;
  createdAt: string;
}
