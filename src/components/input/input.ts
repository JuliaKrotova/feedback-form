import { Console } from "console";
import Component, { ComponentProps } from "../../app/js/component";

export default class Input extends Component.Default {
  nInput: HTMLInputElement;
  type: string = "text";
  nError: HTMLElement;
  success: boolean = false;

  constructor(element: ComponentProps) {
    super(element);
    this.nInput = this.nRoot.querySelector("input");
    this.nError = this.nRoot.querySelector(".input__error");
    this.type = this.nInput.type;

    switch (this.type) {
      case "email":
        this.nInput.addEventListener("input", this.emailValidate);
        this.nInput.addEventListener("blur", () => { this.setError('Неверный eMail')});
        break;
      case "tel":
        this.nInput.addEventListener("input", this.phoneValidate);
        this.nInput.addEventListener("blur", () => { this.setError('Неверный телефон')});
        break;
      default:
        this.nInput.addEventListener("input", this.defaultValidate);
        this.nInput.addEventListener("blur", () => { this.setError('Заполните это поле')});
    }
  }

  getName = (): string => this.nInput.name;

  getValue = (): string => this.nInput.value;

  getSuccess = (): boolean => this.success;

  setFill = () => {
    if (this.success) {
      this.nRoot.classList.add("fill");
    } else {
      this.nRoot.classList.remove("fill");
    }
  };

  emailValidate = (e: any) => {
    const value = e.target.value;
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    this.success = value && reg.test(value);
    this.setFill();
  };

  phoneValidate = (e: any) => {
    const value = e.target.value;
    const reg = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;
    this.success = value && reg.test(value);
    this.setFill();
  };

  defaultValidate = (e: any) => {
    const value = e.target.value;
    this.success = !!value.length;
    this.setFill();
  };

  setError = (message: string) => {
    if (this.success) {
      this.nError.textContent = "";
      this.nRoot.classList.remove("error");
    } else {
      this.nError.textContent = message;
      this.nRoot.classList.add("error");
    }
  };



  destroy = () => {
    // Destroy functions
  };
}
