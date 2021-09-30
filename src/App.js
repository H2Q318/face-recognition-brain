import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'
import 'tachyons'

const app = new Clarifai.App({
    apiKey: 'b74ecc851c7448979657b880ee74f455',
})

const particlesOptions = {
    particles: {
        number: {
            value: 90,
            density: {
                enable: true,
                value_area: 1000,
            },
        },
    },
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputimage')
        const width = Number(image.width)
        const height = Number(image.height)
        console.log(width + ' ' + height)
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then((response) => this.calculateFaceLocation(response))
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className='App'>
                <Particles className='particles' params={particlesOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        )
    }
}

export default App
