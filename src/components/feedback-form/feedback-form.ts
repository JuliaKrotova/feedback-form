import Component, { ComponentProps, getComponents } from '../../app/js/component';
const axios = require('axios');
import Input from '../input/input';

export default class FeedbackForm extends Component.Default {
    nInputs: Input[];
    nButton: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);

        this.nInputs = getComponents('input').map(input => new Input(input));
        this.nButton = this.getElement('button');

        this.nButton.addEventListener('click', this.collectData);
    }

    collectData = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const data: any = {};
        this.nInputs.forEach(link => data[link.getName()] = link.getValue());
        this.sendData(data);
    }

    sendData = (data: any) => {
        axios.post('/', data)
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error));
    }

    destroy = () => {
        // Destroy functions
    }
}