import { List } from "./List"
import { render } from "@testing-library/react";

test("renders list component", () => {
    const data = [
        { name: "Pablo Padilla", age: 20, grades: [60, 70, 90, 50] },
        { name: "Johnny Ochoa", age: 23, grades: [54, 62, 98, 55] },
        { name: "Sonia Padilla", age: 46, grades: [48, 88, 90, 33] },
        { name: "Saleh", age: 24, grades: [44, 77, 95, 12] },
        { name: "Rhe M", age: 23, grades: [65, 78, 40, 82] },
    ];
    const styles = { backgroundColor: "red" };

    const renderMethod = (item: any, index: number) => (
        <div key={index}>
            <h1>{item.name}</h1>
            <h3>{item.age}</h3>
            <p>{item.grades.join(", ")}</p>
        </div>
    )

    const { getByText } = render(
        <List
            data={data}
            style={styles}
            renderMethod={renderMethod}
        />
    )

    expect(getByText("Pablo Padilla")).toBeInTheDocument();


})