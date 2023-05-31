import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { IoReloadOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userIdSelector } from "../../app/selector";
import pages from "../../json/PAGE.json";
import axiosInstance from "../../utils/axiosInstance";
import { DynamicIcon } from "./DynamicIcon/DynamicIcon";
import styles from "./PageView.module.scss";
const cx = className.bind(styles);
const PageView = () => {
  const [queryParam] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState({
    show: false,
    mode: "",
    api: "",
    idUpdate: "",
    advanceModalShow: false,
    deleteShow: false,
  });
  const [selectValue, setSelectValue] = useState({
    value: "",
  });
  const [dataFinded, setdataFinded] = useState([]);
  const [idDelete, setIdDelete] = useState("");
  const [users, setUsers] = useState([]);
  const [listDatas, setlistDatas] = useState([]);
  const [inputSearch, setinputSearch] = useState("");
  const [form] = Form.useForm();
  const currentUserId = useSelector(userIdSelector);

  // control modal form
  const handleOk = (valueChange) => {
    setIsModalOpen({ ...isModalOpen, ...valueChange });
  };
  const handleCancel = (valueChange) => {
    setIsModalOpen({ ...isModalOpen, ...valueChange });
  };
  const handleDeletOk = () => {
    handleActionDeleteApi(idDelete, isModalOpen.api);
    setIsModalOpen({ ...isModalOpen, deleteShow: false });
  };

  const handleDeleteBtnClick = (record, btn) => {
    setIdDelete(record.id);
    setIsModalOpen({
      ...isModalOpen,
      deleteShow: true,
      api: btn.api,
    });
  };
  const handleUpdateBtnClick = (id, apiFindData, mode, api) => {
    // fetch data
    axiosInstance
      .get(`/api/${apiFindData}?id=${id}`)
      .then((response) => {
        if (response.data.success) {
          form.setFieldsValue(response.data.result);
          setIsModalOpen({
            ...isModalOpen,
            show: true,
            mode,
            api,
            idUpdate: response.data.result.id,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleSubmitForm = (value) => {
    switch (isModalOpen.mode) {
      case "create":
        handleActionCreateApi(value, isModalOpen.api);
        break;
      case "update":
        handleActionUpdateApi(value, isModalOpen.api, isModalOpen.idUpdate);
      default:
        break;
    }
  };
  const handleOnAdvanceSearch = (values, api) => {
    const whereCondition = values.advancedSearch
      .map(
        (value) => `"${value.column}":{"${value.operator}":"${value.value}"}`
      )
      .join(",");
    axiosInstance
      .get(`/${api}?where={${whereCondition}}`)
      .then((response) => {
        setdataFinded(response.data);
        setIsModalOpen({ ...isModalOpen, advanceModalShow: false });
        toast.success("Search advance done");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleActionCreateApi = (data, api) => {
    axiosInstance
      .post(`/api/${api}`, {
        data,
      })
      .then((response) => {
        setdataFinded([response.data.result, ...dataFinded]);
        toast.success(response.data.message);
        setIsModalOpen({ ...isModalOpen, show: false });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleActionUpdateApi = (data, api, id) => {
    axiosInstance
      .put(`/api/${api}?id=${id}`, {
        data,
      })
      .then((response) => {
        if (response.data.success) {
          setdataFinded((prev) =>
            prev.map((pr) =>
              pr.id === response.data.result.id ? response.data.result : pr
            )
          );
          toast.success(response.data.message);
          setIsModalOpen({ ...isModalOpen, show: false });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleActionDeleteApi = (id, api) => {
    axiosInstance
      .delete(`/api/${api}?id=${id}`)
      .then((response) => {
        if (response.data.success) {
          setdataFinded((prev) =>
            prev.filter((pr) => pr.id !== response.data.result.id)
          );
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleInputSearchOnchange = (e) => {
    setinputSearch(e.target.value);
  };
  const handleClickBtnSearch = (searchApi, filterable) => {
    if (inputSearch === "") {
      toast.warning("Please enter search input value");
      return;
    } else {
      const whereCondition = filterable
        .map((fil) => `"${fil}":{"contains":"${inputSearch}"}`)
        .join(",");
      axiosInstance
        .get(`/${searchApi}?where={${whereCondition}}`)
        .then((response) => {
          setdataFinded(response.data);
          toast.success("Search done");
          setinputSearch("");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error.message);
        });
    }
  };

  const fetchGetDatas = (api) => {
    axiosInstance
      .get(`/${api}`)
      .then((response) => {
        setdataFinded(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchListDataSelect = (api) => {
    axiosInstance
      .get(`/api/${api}`)
      .then((response) => {
        if (response.data.success) {
          setlistDatas(
            response.data.result.map((data) => ({
              value: data.name,
              label: data.label,
            }))
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    pages.filter(
      (page) =>
        page.sid === queryParam.get("sid") && fetchGetDatas(page.apiFindData)
    );
  }, [queryParam.get("sid")]);
  useEffect(() => {
    axiosInstance
      .get("/user")
      .then((response) => {
        setUsers(
          response.data.map((user) => ({
            value: user.id,
            label: user.username,
          }))
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className={cx("wrapper")}>
      {pages
        .filter((page) => page.sid === queryParam.get("sid"))
        .map((page, index) => (
          <div key={index} className={cx("page")}>
            <div className={cx("header")}>
              <div className={cx("name")}>{page.name}</div>
              <div className={cx("buttons")}>
                {page.button.length === 0 ? (
                  <></>
                ) : (
                  <>
                    {page.button
                      .filter(
                        (btn) =>
                          btn.position.includes("table") &&
                          btn.mode === "create"
                      )
                      .map((btn, index) => (
                        <Button
                          key={index}
                          type={btn.variant}
                          className={cx("button")}
                          onClick={() => {
                            form.resetFields();
                            setIsModalOpen({
                              show: true,
                              mode: btn.mode,
                              api: btn.api,
                            });
                          }}
                        >
                          <DynamicIcon name={btn.icon} />{" "}
                          <span>{btn.name}</span>
                        </Button>
                      ))}
                  </>
                )}
              </div>
            </div>
            <div className={cx("filter")}>
              <div className={cx("filter-wrapper")}>
                <Input.Search
                  placeholder="Enter search input values"
                  enterButton
                  className={cx("search-input")}
                  onChange={handleInputSearchOnchange}
                  value={inputSearch}
                  onSearch={() =>
                    handleClickBtnSearch(
                      page.apiFindData,
                      page.grid
                        .filter((gr) => gr.search === true)
                        .map((gr) => gr.field)
                    )
                  }
                />
                <div className={cx("buttons-group")}>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsModalOpen({
                        ...isModalOpen,
                        advanceModalShow: true,
                      });
                    }}
                  >
                    <SlArrowDown size={13} />
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: "2px" }}
                    onClick={() => {
                      fetchGetDatas(page.apiFindData);
                      toast.success("Reload data");
                    }}
                  >
                    <IoReloadOutline size={13} />
                  </Button>
                </div>
              </div>
            </div>
            <div className={cx("content")}>
              <Table
                pagination={false}
                columns={[
                  {
                    title: "Index",
                    dataIndex: "index",
                    key: "index",
                  },
                  {
                    title: "Id",
                    dataIndex: "id",
                    key: "id",
                  },
                  ...page.grid.map((gr) => ({
                    title: gr.name,
                    dataIndex: gr.field,
                    key: gr.field,
                  })),
                  ,
                  {
                    title: "Action",
                    dataIndex: "index",
                    key: "index",
                    render: (_, record) => (
                      <Space size="middle">
                        <Dropdown
                          menu={{
                            items: page.button
                              .filter((btn) => btn.position.includes("action"))
                              .map((btn, index) => ({
                                label: (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      if (btn.mode === "delete") {
                                        handleDeleteBtnClick(record, btn);
                                      } else if (btn.mode === "update") {
                                        handleUpdateBtnClick(
                                          record.id,
                                          btn.apiFindData,
                                          btn.mode,
                                          btn.api
                                        );
                                      }
                                    }}
                                    type={btn.variant}
                                    className={cx("btn-action")}
                                  >
                                    <DynamicIcon name={btn.icon} />{" "}
                                    <span className={cx("title-btn")}>
                                      {btn.name}
                                    </span>
                                  </div>
                                ),
                                key: index,
                              })),
                          }}
                          trigger={["click"]}
                        >
                          <FiSettings size={18} style={{ cursor: "pointer" }} />
                        </Dropdown>
                      </Space>
                    ),
                  },
                ]}
                dataSource={dataFinded
                  .filter((data) => data.id !== currentUserId)
                  .map((data, index) => ({
                    index: index + 1,
                    id: data.id,
                    ...data,
                  }))}
              />
            </div>
            {/* FORM  */}
            <Modal
              style={{ minWidth: "800px" }}
              centered
              title={page.name}
              open={isModalOpen.show}
              onOk={() => handleOk({ show: false })}
              onCancel={() => handleCancel({ show: false })}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleSubmitForm} form={form}>
                <Row style={{ padding: "12px" }}>
                  {page.schema.map((sche, index) => (
                    <Col key={index} span={11} style={{ marginRight: "20px" }}>
                      <Form.Item
                        label={sche.name}
                        name={sche.field}
                        rules={[
                          {
                            required: sche.required,
                          },
                        ]}
                      >
                        {sche.widget === "Input" ? (
                          <Input
                            disabled={
                              sche.readOnly && isModalOpen.mode === "update"
                            }
                          />
                        ) : sche.widget === "TextArea" ? (
                          <TextArea />
                        ) : sche.widget === "Select" ? (
                          <Select
                            onClick={() => {
                              fetchListDataSelect(sche.apiListData);
                            }}
                            options={listDatas}
                            placeholder={sche.placeholder}
                          ></Select>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  ))}
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    {page.button
                      .filter(
                        (btn) =>
                          btn.position.includes("modal") &&
                          isModalOpen.mode === btn.mode
                      )
                      .map((btn, index) => (
                        <Button
                          key={index}
                          type={btn.variant}
                          htmlType={"submit"}
                        >
                          {btn.name}
                        </Button>
                      ))}
                    <Button
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        handleCancel({ show: false });
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal>
            {/* modal search advance */}
            <Modal
              style={{ minWidth: "800px" }}
              centered
              title={"Advanced Search"}
              open={isModalOpen.advanceModalShow}
              onOk={() => handleOk({ advanceModalShow: false })}
              onCancel={() => handleCancel({ advanceModalShow: false })}
              footer={null}
            >
              <Form
                name="dynamic_form_nest_item"
                onFinish={(value) =>
                  handleOnAdvanceSearch(value, page.apiFindData)
                }
                autoComplete="off"
              >
                <Form.List name="advancedSearch">
                  {(fields, { add, remove }) => {
                    return (
                      <>
                        {fields.map((field) => (
                          <Space
                            key={field.key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              name={[field.name, "column"]}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                onChange={(value) => {
                                  setSelectValue({ ...selectValue, value });
                                }}
                                placeholder={"Please select an column"}
                                style={{ width: "200px" }}
                              >
                                {page.grid
                                  .filter((gr) => gr.filterable)
                                  .map((gr) => ({
                                    value: gr.field,
                                    label: gr.name,
                                  }))
                                  .map((opt, index) => (
                                    <Select.Option
                                      key={index}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={[field.name, "operator"]}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                placeholder="Please select an operator"
                                style={{ width: "200px" }}
                              >
                                {[
                                  ...(page.schema.filter(
                                    (sch) => selectValue.value === sch.field
                                  ).length === 0
                                    ? [
                                        {
                                          value: "contains",
                                          label: "Contains",
                                        },
                                        {
                                          value: "startsWith",
                                          label: "StartsWith",
                                        },
                                        { value: "equals", lable: "Equals" },
                                        {
                                          value: "endsWith",
                                          label: "EndsWith",
                                        },
                                      ]
                                    : page.schema.filter((sch) =>
                                        selectValue.value !== ""
                                          ? sch.field === selectValue.value
                                          : { type: "string" }
                                      )[0].type === "string"
                                    ? [
                                        {
                                          value: "contains",
                                          label: "Contains",
                                        },
                                        {
                                          value: "startsWith",
                                          label: "StartsWith",
                                        },
                                        {
                                          value: "endsWith",
                                          label: "EndsWith",
                                        },
                                      ]
                                    : [
                                        { value: ">=", label: ">=" },
                                        { value: ">", label: ">" },
                                        { value: "=", label: "=" },
                                        { value: "<=", label: "<=" },
                                        { value: "<", label: "<" },
                                      ]),
                                ].map((opt, index) => (
                                  <Select.Option key={index} value={opt.value}>
                                    {opt.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={[field.name, "value"]}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input placeholder="Enter value to search" />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          ></Button>
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            {/* modal delete */}
            <Modal
              title="Are you sure delete this ?"
              open={isModalOpen.deleteShow}
              onOk={handleDeletOk}
              onCancel={() => handleCancel({ deleteShow: false })}
            >
              Are you sure delete this document with id : {idDelete}
            </Modal>
          </div>
        ))}
    </div>
  );
};

export default PageView;
