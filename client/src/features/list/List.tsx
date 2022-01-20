import React from 'react';

interface Props {
    data?: Array<any>;
    renderMethod?: (item: any, i: number) => JSX.Element;
    style?: React.CSSProperties | undefined
}

export const List: React.FC<Props> = ({ data, renderMethod, style }) => {
    return (
        <div style={style}>
            {
                data?.map((item, i) => renderMethod?.(item, i))
            }
        </div>
    );
};
