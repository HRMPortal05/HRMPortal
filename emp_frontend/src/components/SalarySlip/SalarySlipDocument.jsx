import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginBottom: 20,
    borderRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginBottom: 1,
  },
  sectionHeaderText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F9FAFB",
    marginTop: 1,
  },
  label: {
    color: "#4B5563",
  },
  value: {
    fontWeight: "bold",
  },
  netPay: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F9FAFB",
    marginTop: 20,
    borderRadius: 4,
  },
});

const SalarySlipDocument = ({ salarySlip }) => {
  const data = salarySlip;
  const earningItems = [
    { label: "Basic Salary", value: data.basic_salary },
    { label: "HRA", value: data.allowances.hra },
    { label: "Transport Allowance", value: data.allowances.transport },
    { label: "Medical Allowance", value: data.allowances.medical },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SALARY SLIP</Text>
          <Text style={styles.subtitle}>Company XYZ</Text>
          <Text style={styles.subtitle}>
            For the month of {data.month} {data.year}
          </Text>
        </View>

        {/* Document Info */}
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.label}>Slip Number</Text>
            <Text style={styles.value}>{data.salary_slip_number}</Text>
          </View>
          <View>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{`${data.month} ${data.year}`}</Text>
          </View>
        </View>

        {/* Earnings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>EARNINGS</Text>
            <Text style={styles.sectionHeaderText}>AMOUNT (₹)</Text>
          </View>

          {earningItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text>{item.label}</Text>
              <Text>{item.value}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.sectionHeaderText}>Total Earnings</Text>
            <Text style={styles.sectionHeaderText}>{data.basic_salary}</Text>
          </View>
        </View>

        {/* Deductions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>DEDUCTIONS</Text>
            <Text style={styles.sectionHeaderText}>AMOUNT (₹)</Text>
          </View>
          <View style={styles.row}>
            <Text>Total Deductions</Text>
            <Text>{data.deductions}</Text>
          </View>
        </View>

        {/* Net Pay Section */}
        <View style={styles.netPay}>
          <Text style={styles.sectionHeaderText}>NET PAY</Text>
          <Text style={styles.sectionHeaderText}>₹ {data.net_pay}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SalarySlipDocument;
