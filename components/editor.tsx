"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

// Підключаємо Quill стилі
import 'quill/dist/quill.snow.css';

// Типи для властивостей компонента
interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

// Головний компонент Editor
export const Editor = ({ onChange, value }: EditorProps) => {
  // Динамічний імпорт ReactQuill, вимикаємо SSR
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill").then((mod) => mod.default), {
        ssr: false,
      }),
    []
  );

  return (
    <div className="bg-white">
      {/* Використовуємо Quill редактор з темою "snow" */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
