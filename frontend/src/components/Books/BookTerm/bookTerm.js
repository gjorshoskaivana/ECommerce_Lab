import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return (
      <tr>
          <td>{props.term.name}</td>
          <td>{props.term.category}</td>
          <td>{props.term.author.name}</td>
          <td>{props.term.availableCopies}</td>
          <td className={"text-right"}>
              <a title={"Delete"} className={"btn btn-danger"}
                 onClick={() => props.onDelete(props.term.id)}>
                  Delete
              </a>
              <a title={"Taken"} className={"btn btn-light"}
                 onClick={() => props.onTaken(props.term.id)}>
                  Mark a copy as Taken
              </a>
              <Link className={"btn btn-info ml-2"}
                    onClick={() => props.onEdit(props.term.id)}
                    to={`/books/edit/${props.term.id}`}>
                  Edit
              </Link>
          </td>
      </tr>
    );
}

export default bookTerm;