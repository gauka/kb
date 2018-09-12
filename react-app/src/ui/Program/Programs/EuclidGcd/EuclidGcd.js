import React from 'react'
import './EuclidGcd.css'
import { gcdEuclidExtended } from '../../../../math_logic/constants/algorithm'

class FormGroupBlock extends React.Component {
    state = {
        n: 3003,
        m: 1404,
    }

    render() {
        return (<div className="tris-code">
            <form>
                <div className="form-group">
                    <label>Число n</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.n}
                        onChange={(e) => { this.setState({ n: e.currentTarget.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label>Число m</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.m}
                        onChange={(e) => { this.setState({ m: e.currentTarget.value }) }}
                    />
                </div>
                <br />
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(e, this.state.n, this.state.m) }}>
                    Вычислить
                </button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ gcd, time, bezoutRatio }) => (
    <div className="tris-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-xs-12">
                </div>
                <div className="col-md-10 col-xs-12">
                    <p><span className="strong-text">НОД:</span> {gcd}</p>
                    <p><span className="strong-text">Время выполнения алгоритма Евклида:</span> {time > 0 ? `${time} мс` : 'меньше миллисекунды'}</p>
                    <p><span className="strong-text">Соотношенение Безу:</span> {bezoutRatio}</p>
                </div>
            </div>
        </div>
    </div>
)

class EuclidGcd extends React.Component {
    state = {
        calc: false,
        gcd: 1,
        time: 0,
        bezoutRatio: '',
    }

    calc = (e, n, m) => {
        e.preventDefault()
        const timeStart = new Date()
        const result = gcdEuclidExtended(n, m)
        const timeEnd = new Date()
        this.setState({ 
            gcd: result.gcd, 
            time: timeEnd - timeStart,
            calc: true,
            bezoutRatio: `nx + my = gcd(n,m)   |   ${n} * ${result.x} + ${m} * ${result.y} = gcd(${n},${m})`
        })
    }

    render() {

        const {
            title,
        } = this.props.content

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        <FormGroupBlock calc={this.calc} />
                    </div>
                    <div className="col-md-9 col-xs-12 result">
                        {this.state.calc &&
                            <ResultBlock
                                gcd={this.state.gcd}
                                time={this.state.time}
                                bezoutRatio={this.state.bezoutRatio}
                            />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Алгори́тм Евкли́да — эффективный алгоритм для нахождения наибольшего общего
                            делителя двух целых чисел (или общей меры двух отрезков). Алгоритм назван
                            в честь греческого математика Евклида (III век до н. э.), который впервые
                            описал его в VII и X книгах «Начал». Это один из старейших численных алгоритмов, используемых в наше время.                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default EuclidGcd
