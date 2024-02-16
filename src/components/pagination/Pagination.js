import { 
  CPagination,
  CPaginationItem } from "@coreui/react";

import { pageTopScroll } from "src/utils";
import { Fragment } from "react";

function Pagination({ perPage, totalPost, PreNext, numchange }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / perPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <CPagination className="PageNavigation">
      <CPaginationItem 
        aria-label="Previous"
        onClick={(event) => {
          PreNext(event.target.text, pageNumbers)
        }}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
        {
          pageNumbers.map((number, idx) => {
            return (
              <Fragment key={idx + 1}>
                <CPaginationItem
                  className="PageItem"
                  onClick={() => {
                    numchange(number)
                    pageTopScroll()
                  }}
                >
                  {number}
                </CPaginationItem>
              </Fragment>
            )
          })
        }
        <CPaginationItem 
          aria-label="Next"
          onClick={(event) => {
            PreNext(event.target.text, pageNumbers)
          }}
        >
          <span>&raquo;</span>
        </CPaginationItem>
    </CPagination>
  )
}

export default Pagination