"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
};

export const Preview = ({
  value,
}: PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <ReactQuill
      className="pl-4 text-md"
      theme="bubble"
      value={value}
      readOnly
    />
  );
};