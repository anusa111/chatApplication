import { Button } from "antd";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  .ant-btn {
    border-color: red;
  }
  .ant-input:focus {
    border-color: var(--primary-color);
  }
`;
