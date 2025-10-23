const chips = {
  marcas: [
    { id: 1, nombre: "Lays", pais: "EE.UU." },
    { id: 2, nombre: "Pringles", pais: "EE.UU." },
    { id: 3, nombre: "Ruffles", pais: "EE.UU." },
    { id: 4, nombre: "Matutano", pais: "España" },
  ],
  patatas: [
    { id: 1, nombre: "Clásicas al punto de sal", sabor: "Original", marcaId: 1 },
    { id: 2, nombre: "Campesinas", sabor: "Hierbas provenzales", marcaId: 1 },
    { id: 3, nombre: "Original", sabor: "Original", marcaId: 2 },
    {
      id: 4,
      nombre: "Sour Cream & Onion",
      sabor: "Crema agria y cebolla",
      marcaId: 2,
    },
    { id: 5, nombre: "Jamón Jamón", sabor: "Jamón", marcaId: 3 },
    { id: 6, nombre: "Bocabits", sabor: "Snack de maíz", marcaId: 4 },
  ],
};

export default chips;