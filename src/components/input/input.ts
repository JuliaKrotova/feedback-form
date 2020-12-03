import Component, { ComponentProps } from "../../app/js/component";

export default class Input extends Component.Default {
  nInput: HTMLInputElement;
  type: string = "text";

  constructor(element: ComponentProps) {
    super(element);

    this.nInput = this.nRoot.querySelector("input");
    this.type = this.nInput.type;

    switch (this.type) {
      case "email":
        this.nInput.addEventListener("input", this.emailValidate);
        break;
      case "tel":
        this.nInput.addEventListener("input", this.phoneValidate);
        break;
      default:
        this.nInput.addEventListener("input", this.defaultValidate);
    }
  }

  getName = (): string => this.nInput.name;

  getValue = (): string => this.nInput.value;

  setFill = (value: boolean) => {
    if (value) {
      this.nRoot.classList.add("fill");
    } else {
      this.nRoot.classList.remove("fill");
    }
  };

  emailValidate = (e: any) => {
    const value = e.target.value;
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    this.setFill(reg.test(value));
  };

  phoneValidate = () => {};

  defaultValidate = (e: any) => {
    const value = e.target.value;
    this.setFill(!!value.length);
  };

  destroy = () => {
    // Destroy functions
  };
}
