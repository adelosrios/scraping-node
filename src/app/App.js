import React, { Component } from 'react';

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            _id: '',
            title: '',
            games: []
        };
        this.addGame = this.addGame.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addGame(e) {
        if(this.state._id) {
            fetch(`/api/games/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: '¡Modificado!'});
                    this.setState({title: ''});
                    this.setState({_id: ''});
                })
                // @todo DEBEMOS MODIFICAR SOLO EL MODIFICADO EL LUGAR DE PEDIR TODO EL ARRAY
                .then(this.getGame())
        } else {
            fetch('/api/games', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: '¡Guardado!'});
                    this.setState({title: ''});
                })
                .then(this.setState({ title: ''}))
                .then(this.getGame())
                .catch(res => console.log(err));
        }

        e.preventDefault();
    }

    editGame(id) {        
        fetch(`/api/games/${id}`) 
            .then(res => res.json())
            .then(data => { 
                this.setState({
                    _id: data._id,
                    title: data.title
                })
            })
            .then(data => {
                M.toast({html: '¡Editado!'});
            })
            // @todo DEBEMOS MODIFICAR SOLO EL MODIFICAR EL LUGAR DE PEDIR TODO EL ARRAY
            .then(this.getGame());
    }

    deleteGame(id) {
        fetch(`/api/games/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({html: '¡Borrado!'});
            })
            // @todo DEBEMOS BORRAR SOLO EL BORRADO EL LUGAR DE PEDIR TODO EL ARRAY
            .then(this.getGame())
            .catch(res => console.log(err));
    }

    componentDidMount() {
        this.getGame();
    }

    getGame() {
        fetch('/api/games') 
            .then(res => res.json())
            .then(data => { 
                this.setState({ games: data })
             });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
           [name]: value     
        });
    }

    render() {
            return (
                <div>
                    <nav className="light-blue darken-4">
                        <div className="container">
                            <a className="brand-logo" href="/">MERN Stack</a>
                        </div>    
                    </nav>

                    <div className="container">
                        <div className="row">
                            <div className="col s5">
                                <div className="card">
                                    <div className="card-content">
                                        <form onSubmit={this.addGame}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="title" type="text" onChange={this.handleChange} placeholder="Titulo" value={this.state.title} />
                                                </div>                                                
                                            </div>
                                            <button type="submit" className="btn light-blue">
                                                Enviar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col s7">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Juego
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.games.map(game => {
                                                return (
                                                    <tr key={game._id}>
                                                        <td>{game.title}</td>
                                                        <td>
                                                            <button className="btn light-blue darken-4" onClick={() => this.editGame(game._id)}>
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.deleteGame(game._id)}>
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )        
                                            })
                                        }                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );    
    }
}

export default App;