import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Стилі для PDF документа
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  details: {
    margin: 20,
  },
  ul: {
    margin: 10,
    paddingLeft: 20,
  },
  li: {
    marginBottom: 5,
  },
  signature: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureText: {
    fontSize: 14,
    textAlign: "left",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

// Компонент документа PDF
const CertificateDocument = ({
  name,
  course,
  date,
  instructorName,
  instructorTitle,
  institutionName,
  institutionLogo,
}) => (
  <Document>
    <Page>
      <Text>Сертифікат</Text>
      <Text>Цим підтверджується, що</Text>
      <Text>
        <strong>{name}</strong>
      </Text>
      <Text>успішно завершив(ла) курс</Text>
      <Text>
        <strong>{course}</strong>
      </Text>
      <Text>від</Text>
      <Text>
        <strong>{institutionName}</strong>
      </Text>
      <View>
        <Text>
          Дата видачі: <strong>{date}</strong>
        </Text>
        <Text>
          <strong>Опис курсу:</strong>
        </Text>
        <View>
          <Text>
            • Основи React, включаючи компоненти, стан та життєвий цикл
            компонентів
          </Text>
          <Text>• Використання хуків React</Text>
          <Text>• Роутинг у Next.js</Text>
          <Text>• Серверний рендеринг та статична генерація у Next.js</Text>
          <Text>• Інтеграція з API та управління станом у Next.js</Text>
          <Text>• Оптимізація продуктивності та SEO</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>____________________________</Text>
          <Text>{instructorName}</Text>
          <Text>{instructorTitle}</Text>
          <Text>{institutionName}</Text>
        </View>
        {/* <Image src={institutionLogo} style={styles.logo} /> */}
      </View>
    </Page>
  </Document>
);

// Компонент для завантаження PDF
const CertificatePDF = (props) => (
  <div>
    <PDFDownloadLink
      document={<CertificateDocument {...props} />}
      fileName="certificate.pdf"
    >
      {({ loading }) =>
        loading ? "Створення документа..." : "Завантажити сертифікат"
      }
    </PDFDownloadLink>
  </div>
);

export default CertificatePDF;
