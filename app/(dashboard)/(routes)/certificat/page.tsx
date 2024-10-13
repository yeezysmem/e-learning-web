import React from "react";
// import "./Certificate.css";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import CertificatePDF from "./_components/document";
interface CertificateProps {
  name: string;
  course: any;
  date: string;
  instructorName: string;
  instructorTitle: string;
  institutionName: string;
}

const Certificate = ({
  name,
  course,
  date,
  instructorName,
  instructorTitle,
  institutionName,
}: CertificateProps) => {
  return (
    <div>
      {/* <Certificate
        name="Ім'я Прізвище"
        course="React та Next.js: Розробка сучасних веб-додатків"
        date="12 травня 2024"
        instructorName="Ім'я та Прізвище Викладача"
        instructorTitle="Посада Викладача"
        institutionName="Назва Навчального Центру"
        // institutionLogo="URL логотипу"
      /> */}
    </div>
  );
};

export default Certificate;
