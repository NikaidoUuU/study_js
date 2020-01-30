// https://ko.reactjs.org/docs/thinking-in-react.html
// JSON API와 목업을 디자이너로부터 받았다고 가정해 봅시다.

// 1단계: UI를 컴포넌트 계층 구조로 나누기
// 우리가 할 첫 번째 일은 모든 컴포넌트(와 하위 컴포넌트)의 주변에 박스를 그리고 그 각각에 이름을 붙이는 것입니다.
// 우리가 새로운 함수나 객체를 만들 때처럼 만드시면 됩니다. 한 가지 테크닉은 단일 책임 원칙입니다.
// 이는 하나의 컴포넌트는 한 가지 일을 하는게 이상적이라는 원칙입니다.
// 하나의 컴포넌트가 커지게 된다면 이는 보다 작은 하위 컴포넌트로 분리되어야 합니다.

// 2단계: React로 정적인 버전 만들기
// 다른 컴포넌트를 재사용하는 컴포넌트를 만들고 props 를 이용해 데이터를 전달해줍시다
// 정적 버전을 만들기 위해 state를 사용하지 마세요.
// state는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용합니다.

class ProductCategoryRow extends React.Component {
  render() {
    const { category } = this.props;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { product } = this.props;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach(product => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" /> Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("container")
);

// 3단계: UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기
// 예를 들어 TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하고
// TODO 아이템의 개수를 표현하는 state를 별도로 만들지 마세요.
// TODO 갯수를 렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 됩니다.

// 4단계: State가 어디에 있어야 할 지 찾기
// 기억하세요: React는 항상 컴포넌트 계층구조를 따라 아래로 내려가는 단방향 데이터 흐름을 따릅니다.
// state를 기반으로 렌더링하는 모든 컴포넌트를 찾으세요.
// 공통 소유 컴포넌트 (common owner component)를 찾으세요.
// 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 합니다.
// state를 소유할 적절한 컴포넌트를 찾지 못하였다면,
// state를 소유하는 컴포넌트를 하나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가하세요.

class ProductCategoryRow extends React.Component {
  render() {
    const { category } = this.props;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { product } = this.props;

    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const { products, filterText, inStockOnly } = this.props;

    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const { filterText, inStockOnly } = this.props;

    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} />
        <p>
          <input type="checkbox" checked={inStockOnly} /> Only show products in
          stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("container")
);

// 5단계: 역방향 데이터 흐름 추가하기

class ProductCategoryRow extends React.Component {
  render() {
    const { category } = this.props;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { product } = this.props;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const { products, filterText, inStockOnly } = this.props;

    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFilterTextChange = e => {
    this.props.onFilterTextChange(e.target.value);
  };

  handleInStockChange = e => {
    this.props.onInStockChange(e.target.checked);
  };

  render() {
    const { filterText, inStockOnly } = this.props;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />{" "}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false
    };
  }

  handleFilterTextChange = filterText => {
    this.setState({
      filterText: filterText
    });
  };

  handleInStockChange = inStockOnly => {
    this.setState({
      inStockOnly: inStockOnly
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("container")
);
