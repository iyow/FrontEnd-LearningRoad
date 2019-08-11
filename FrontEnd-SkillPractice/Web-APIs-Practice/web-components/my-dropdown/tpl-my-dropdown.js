const template = document.createElement('template');
// css open类控制显隐
template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }

    .dropdown {
      padding: 3px 8px 8px;
    }
    .dropdown.open .dropdown-list {
        display: flex;
        flex-direction: column;
    }

    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }

    .dropdown-list-container {
      position: relative;
    }

    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }

    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }
    .dropdown-list li.selected {
        font-weight: 600;
    }
  </style>

  <div class="dropdown">
    <span class="label">Label</span>

    <my-button as-atom>Content</my-button>

    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;

export default template