import { useSelector } from "react-redux";

function Customer() {
  // subscription to the store (with re-renders):
  const customer = useSelector((store) => store.customer.fullName);
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
