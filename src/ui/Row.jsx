import styled, { css } from "styled-components";

const Row = styled.div`
    ${({ type = "horizontal" }) => {
        if (type === 'horizontal') {
            return css`
                justify-content: space-between;
                align-items: center;
            `
        }

        if (type === 'vertical') {
            return css`
                flex-direction: column;
                gap: 1.6rem;
            `
        }

    }}

    display: flex;
`
export default Row;