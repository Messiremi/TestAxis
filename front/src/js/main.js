import React, { useState } from 'react';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//---------------------------------------
// Ajout d'utilisateurs
//---------------------------------------
// formulaire d'ajout d'utilisateur
function AddUserForm(props){
	const [startDate, setStartDate] = useState(new Date());
	return (<Popup trigger={<table><tbody><tr><td><button id="button-add" title="ajouter un utilisateur"></button></td><td><h1>Ajouter un utilisateur</h1></td></tr></tbody></table>} position="top center" modal closeOnDocumentClick>
		<div className="detail-popup">
			<div className="detail-popup-header"><table><tbody><tr><td><img src={require("../img/user.png")} alt="logo"/></td><td>Ajouter un utilisateur</td></tr></tbody></table></div>
			<div className="detail-popup-content">
				<table><tbody>
				<tr>
					<td>Nom</td>
					<td>:</td>
					<td><input type="text" id="form-lastname"/></td>
				</tr>
				<tr>
					<td>Prénom</td>
					<td>:</td>
					<td><input type="text" id="form-firstname"/></td>
				</tr>
				<tr>
					<td>Date de naissance</td>
					<td>:</td>
					<td><DatePicker id="form-birthdate" selected={startDate} onChange={date => setStartDate(date)} 
					dateFormat="yyyy-MM-dd"
					showYearDropdown/></td>
				</tr>
				<tr>
					<td>Email</td>
					<td>:</td>
					<td><input type="text" id="form-email"/></td>
				</tr>
				<tr>
					<td>Group</td>
					<td>:</td>
					<td>
						<select type="text" id="form-group">
							<option value="" key="0"></option>
							{props.groups.map((u)=>{
						return(
							<option value={u.groupname} key={u.id}>{u.groupname}</option>
						)})}
						</select>
					</td>
				</tr>
				</tbody></table>
				<button id="form-submit" onClick={()=>props.onClick()}>
					Ajouter
				</button>
			</div>
		</div>
	</Popup>
	);
}
//---------------------------------------
// Liste des utilisateurs
//---------------------------------------
// composant filtre de recherche
function Filtres(props){
	return (<>
    <input type="text" id="search-text"/>
    <button id="button-chercher" onClick={()=>props.onClick()}>
		Filtrer
    </button></>
	);
}

// checkbox tableau liste des utilisateurs
function CheckboxUser(){
	return (
    <input type="checkbox" className="check-user"/>
	);
}

// bouton detail liste des utilisteurs qui ouvre la popup de detail
function ButtonDetail(props){
    var diffAge = Date.now() - new Date(props.value.birthdate).getTime();
    var dateAge = new Date(diffAge);
	var age = Math.abs(dateAge.getUTCFullYear() - 1970);
	return (
	<Popup trigger={<button id="button-detail" title="voir les détails"></button>} position="top center" modal closeOnDocumentClick>
		<div className="detail-popup">
			<div className="detail-popup-header"><table><tbody><tr><td><img src={require("../img/user.png")} alt="logo"/></td><td>Détail utilisateur</td></tr></tbody></table></div>
			<div className="detail-popup-content">
				<table><tbody>
				<tr>
					<td width="100">Nom</td>
					<td width="20">:</td>
					<td>{props.value.lastname}</td>
				</tr>
				<tr>
					<td width="100">Prénom</td>
					<td width="20">:</td>
					<td>{props.value.firstname}</td>
				</tr>
				<tr>
					<td width="100">Age</td>
					<td width="20">:</td>
					<td>{age}</td>
				</tr>
				</tbody></table>
			</div>
		</div>
	</Popup>
	);
}

// bouton delete liste des utilisteurs qui supprime l'utilisateur correspondant à la ligne
function ButtonDelete(props){
	return (
    <button id="button-delete" title="supprimer l'utilisateur" onClick={()=>props.onClick()}>
    </button>
	)
}

// bouton pour selectionner ou deselectionner toutes les checkbox
function ButtonSelectAll(){
	return (
    <button id="button-select" onClick={()=>checkboxSelection()}>
		Selectionner / Désélectionner tout
    </button>
	);
}

// bouton pour delete les utilisteurs selectionnés via leur checkbox
function ButtonDeleteSelection(props){
	return (
    <button id="button-delete-selection" onClick={()=>props.onClick()}>
		Supprimer
    </button>
	)
}

//---------------------------------------
// Main content
//---------------------------------------
class Content extends React.Component {   
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersToSee: [],
			groups: []
		};
	}
	
	//--------
	// Actions
	//--------
	// a la construction du composant on initialise la liste complete des utilisateurs, la liste des utilisateurs a afficher et la liste des groupes
	componentDidMount() {
		fetch(this.props.api+"users")
		.then(results => {
			return results.json();
		})
		.then(userdata => {
			let users = userdata;
			fetch(this.props.api+"groups")
			.then(results => {
				return results.json();
			})
			.then(groupdata => {
				let groups = groupdata;
				this.setState({users:users, usersToSee:users, groups:groups});
			})
		})
	}
	
	// a la destruction du composant
	componentWillUnmount() {
	  this.serverRequest.abort();
	}
	
	// filtrer le tableau sur les colonnes Nom du groupe et Utilisateur, recoit une chaine de texte qui doit être contenue dans une des colonnes
	filterUsers(criteria){
		const uncasedCriteria = criteria.toUpperCase();
		const userList = this.state.users.slice();
		const filteredUserList = userList.filter(row => {
			return (
			(row.group != null && row.group.toUpperCase().includes(uncasedCriteria)) ||
			row.firstname.toUpperCase().includes(uncasedCriteria) || 
			row.lastname.toUpperCase().includes(uncasedCriteria)
			)});
		this.setState({users:userList, usersToSee:filteredUserList, groups:this.state.groups});	
	}
	
	// requete de suppression d'utilisateurs, recoit une liste d'utilisateurs
	deleteUsers(usersToDelete){
		fetch(this.props.api+"deleteusers", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ users: usersToDelete })})
		.then(results => {
			return results.json();
		})
		.then(data => {
			document.getElementById("search-text").value="";
			let users = data;
		this.setState({users:users, usersToSee:users, groups:this.state.groups});
		})
	}
	
	// suppression des utilisateurs sélectionnés:
	// on constitue une liste des utilisateurs à supprimer en parcourant la liste des utilisateurs affichés puis on appele la requete de suppression d'utilisateurs
	deleteSelectedUsers(){
		const userList = this.state.usersToSee;
		var usersToDelete = [];
		for(var i=0, n=userList.length;i<n;i++) {
			var userRow = document.getElementById('user-'+userList[i].id);
			if(userRow.cells[0].firstChild.checked){
				usersToDelete = usersToDelete.concat([userList[i]]);
			}
		}
		this.deleteUsers(usersToDelete);
	}
	
	// requete d'ajout d'utilisateur
	addUser(){
		//récupération des données du formulaire
		var lastname = document.getElementById("form-lastname").value;
		var firstname = document.getElementById("form-firstname").value;
		var birthdate = document.getElementById("form-birthdate").value;
		var email = document.getElementById("form-email").value;
		var group = document.getElementById("form-group").value;
		//verification des valeurs, seul le group peut etre vide. si valeurs incorrectes, on ne fait rien
		if(lastname === "" || firstname === "" || birthdate === "" || email === ""){
			return;
		}
		birthdate = birthdate + "T00:00:00";//manual transformation to datetime format
		var userToAdd;
		if(group === ""){
			userToAdd = JSON.stringify({lastname:lastname,firstname:firstname,email:email,birthdate:birthdate});
		}
		else{
			userToAdd = JSON.stringify({lastname:lastname,firstname:firstname,email:email,birthdate:birthdate,group:group});
		}
		console.log(userToAdd);
		//send request
		fetch(this.props.api+"user", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		body: userToAdd})
		.then(results => {
			return results.json();
		})
		.then(data => {				
			document.getElementById("form-lastname").value="";
			document.getElementById("form-firstname").value="";
			document.getElementById("form-birthdate").value=new Date();
			document.getElementById("form-email").value="";
			document.getElementById("form-group").value="";
			let users = data;
		this.setState({users:users, usersToSee:users, groups:this.state.groups});
		})
	}
	
	//--------
	// Generation
	//--------
	render (){
    return (
		<div id="content">
			<div id="toppart">
				<table id="topcontent">
					<tbody>
						<tr>
							<td id="logo">
								<img src={require("../img/user.png")} alt="logo"/>
							</td>
							<td id="titre">
								Test Axis
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="bodypart">
				<h1>Liste des utilisateurs</h1>
				<div id="userlistctrl1">
					Rechercher: <Filtres onClick={() => this.filterUsers(document.getElementById("search-text").value)} />
				</div>
				<table id="userlist" cellSpacing="0">
					<thead>
						<tr>
							<td width="20"></td>
							<td width="100">Nom du groupe</td>
							<td width="250">Utilisateur</td>
							<td>Email</td>
							<td width="20"></td>
							<td width="20"></td>
						</tr>
					</thead>
					<tbody>
						{this.state.usersToSee.map((u)=>{
			return(
				<tr id={"user-"+u.id} key={u.id}>
					<td><CheckboxUser /></td>
					<td>{u.group}</td>
					<td>{u.lastname.toUpperCase() + " " + u.firstname}</td>
					<td>{u.email}</td>
					<td><ButtonDetail value={u}/></td>
					<td><ButtonDelete onClick={()=> this.deleteUsers([u])}/></td>
				</tr>
			)})}
					</tbody>
				</table>
				<div id="userlistctrl2">
					<ButtonSelectAll />
					<ButtonDeleteSelection onClick={()=> this.deleteSelectedUsers()}/>
				</div>
				
				<AddUserForm groups={this.state.groups} onClick={() => this.addUser()}/>
			</div>
		</div>
	);}
}

export default Content;

//---------------------------------------
// Tools
//---------------------------------------
function checkboxSelection() {
	//get checkbox list
	var checkboxes = document.getElementsByClassName('check-user');
	//check if we have to select all or deselect all, select all if there is at least one checkbox unchecked
	var checkall = false;
	for(var i=0, n=checkboxes.length;i<n;i++) {
		if(!checkboxes[i].checked){
			checkall = true;
			break;
		}
	}
	//set all checkboxes new value
	for(i=0, n=checkboxes.length;i<n;i++) {
		checkboxes[i].checked = checkall;
	}
}