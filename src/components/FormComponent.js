import React from 'react'
import Button from 'react'
export default function FormComponent() {

    const [skyBox1, setSkyUrl1] = React.useState()

    const inputSkyBox1Change = (event) => {
        // console.log(event.target.value)
        setSkyUrl1(event.target.value)
    }
    const skyBox1OnClick = (event) => {
        event.preventDefault()
        console.log(event.target.value)

    }
    return (
        <form>
            <h2>Aframe admin</h2>
            <tr>
                <td>
                    Sky box 1
                </td>
                <td>
                    <input onChange={inputSkyBox1Change}></input>
                </td>
            </tr>
            <button>Preview</button>
        </form>
    )
}