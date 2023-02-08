const todos = [
  {
    id: 1,
    title: "Llevar a los perritos a pasear",
    description: "Recordar llevar a los 4",
    done: true,
    slug: "llevar-a-los-perritos-a-pasear"
  },
  {
    id: 2,
    title: "Terminar curso de Elixir",
    description: "Hacer el de la subscripción",
    done: false,
    slug: "terminar-curso-de-elixir"
  },
  {
    id: 3,
    title: "Ir al Gym",
    description: "Toca hacer pierna",
    done: true,
    slug: "ir-al-gym"
  }
];

const newTodo = {
  id: null,
  title: "",
  description: "",
  done: false
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTodo,
  todos
};
