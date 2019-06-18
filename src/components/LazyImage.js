import React, { Component } from 'react';

export default class LazyImage extends Component {
    state = { src: null }
    componentWillMount(){
        this.setState({ src: this.props.placeholder })
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.src||nextProps.src !== this.state.src) {
            this.setState({ src: nextProps.placeholder })
            let image = new Image()

            image.src = nextProps.src;
            image.onload = () => {

                this.setState({ src: image.src })
                console.log("Loaded lazy image", this.src)

            }
        }

        /* if (nextProps.value !== this.state.value) { 
            const {}=this.props;
          this.setState({value: nextProps.value})
        } */
    }
    render() {
        const { } = this.props;
        return (
            <img src={this.state.src} style={this.props.style} className={this.props.className} />
        );
    }
}
