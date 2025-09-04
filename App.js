import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";

export default function App() {
  const [valorProduto, setValorProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [codigoPagamento, setCodigoPagamento] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularVenda = () => {
    const valor = parseFloat(valorProduto.replace(',', '.'));
    const qtd = parseInt(quantidade);
    const codigo = parseInt(codigoPagamento);

    if (isNaN(valor) || isNaN(qtd) || isNaN(codigo)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const valorCompra = valor * qtd;
    let desconto = 0;
    let tipoPagamento = "";

    switch (codigo) {
      case 1:
        desconto = valorCompra * 0.10;
        tipoPagamento = "À vista (dinheiro/pix)";
        break;
      case 2:
        desconto = valorCompra * 0.05;
        tipoPagamento = "À vista no cartão";
        break;
      case 3:
        desconto = 0;
        tipoPagamento = "Em 2x no cartão";
        break;
      case 4:
        desconto = -valorCompra * 0.05;
        tipoPagamento = "Em 3x ou mais no cartão";
        break;
      default:
        alert("Código de pagamento inválido!");
        return;
    }

    const valorFinal = valorCompra - desconto;

    setResultado({ valorCompra, desconto, valorFinal, tipoPagamento });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F7F8F9" barStyle="dark-content" />
      <Text style={styles.title}>Calculadora de Venda</Text>
      <Text style={styles.subtitle}>Simples, rápida e funcional</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor do produto"
        keyboardType="numeric"
        value={valorProduto}
        onChangeText={setValorProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Código do pagamento (1-4)"
        keyboardType="numeric"
        value={codigoPagamento}
        onChangeText={setCodigoPagamento}
      />

      <TouchableOpacity style={styles.button} onPress={calcularVenda}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.card}>
          <Text style={styles.cardItem}>
            <Text style={styles.cardLabel}>Valor compra:</Text> R$ {resultado.valorCompra.toFixed(2)}
          </Text>
          <Text style={styles.cardItem}>
            <Text style={styles.cardLabel}>Desconto:</Text> R$ {resultado.desconto.toFixed(2)}
          </Text>
          <Text style={styles.cardItem}>
            <Text style={styles.cardLabel}>Valor final:</Text> R$ {resultado.valorFinal.toFixed(2)}
          </Text>
          <Text style={styles.cardItem}>
            <Text style={styles.cardLabel}>Pagamento:</Text> {resultado.tipoPagamento}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#04081F",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#05275E",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  button: {
    backgroundColor: "#10B3C8",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#04081F",
  },
  cardLabel: {
    fontWeight: "bold",
  },
});
