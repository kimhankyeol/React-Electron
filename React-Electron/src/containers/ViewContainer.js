//필터 정보를 받아서 렌더링
import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
    margin: 0 auto; /*가운데 정렬*/
`;

const viewContainer = ({visible,children}) => visible ? (
    <Wrapper>
        {children}
    </Wrapper>
) : null;

export default viewContainer;