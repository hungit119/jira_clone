import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Modal from "../Modal";
import ModalCenterContent from "../ModalCenterContent";
import IssueCreate from "../../layouts/components/IssueCreate";
import IssueSearch from "../../layouts/components/IssueSearch";

const CheckQueryParameter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramSearch = queryParams.get("modal-issue-search");
  const paramCreate = queryParams.get("modal-issue-create");
  return (
    <>
      {paramCreate === "true" ? (
        <Modal popup={true}>
          <ModalCenterContent
            popup={true}
            maxWidth={"800px"}
            queryParameter={"modal-issue-create"}
          >
            <IssueCreate />
          </ModalCenterContent>
        </Modal>
      ) : paramSearch === "true" ? (
        <Modal popup={true} queryParameter={"modal-issue-search"}>
          <IssueSearch queryParameter={"modal-issue-search"} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

CheckQueryParameter.propTypes = {};

export default CheckQueryParameter;
