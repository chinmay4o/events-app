import React from "react";

function PaginationClassic({ onClick, total, page }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          {/* <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 text-slate-300 cursor-not-allowed"
              href="#0"
              disabled
            >
              &lt;- Previous
            </a>
          </li> */}
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 hover:border-slate-300 text-primary text-[14px]"
              href="#0"
              onClick={onClick}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600">
          {(page - 1) * 10 + 1}
        </span>{" "}
        to <span className="font-medium text-slate-600">{page * 10}</span> of{" "}
        <span className="font-medium text-slate-600">{total}</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
