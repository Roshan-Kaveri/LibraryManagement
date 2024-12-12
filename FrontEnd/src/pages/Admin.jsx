import React from "react"
import BookStatus from "../components/admin/BookStatus";
import PaymentStatus from "../components/admin/PaymentStatus";

const AdminPage = (props) => {
  return (
    <div>
      <BookStatus></BookStatus>
  <PaymentStatus/>
    </div>
  )
};

export default AdminPage;
