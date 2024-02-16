import { 
  CProgress, CProgressBar, CModalBody, CCol, CRow
} from "@coreui/react";

export default function Charging(props) {
  const { showBar, showText } = props;

  return (
    <div>
      <CModalBody>
        <CRow>
          <CProgress className="mb-3">
            <CProgressBar color="success" value={showBar}>{`${showBar}%`}</CProgressBar>
          </CProgress>
        </CRow>
        <CRow>
          <div className="text-center">
            <h5>{showText}</h5>
          </div>
        </CRow>
      </CModalBody>
    </div>
  )
}
