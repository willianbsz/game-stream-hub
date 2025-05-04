"use client";

import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp());
}
