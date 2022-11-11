import React from 'react';

const Contact = (props) => {

    const contacts = {
        'mail' : {
            'id' : 'contact_1',
            'link' : "mailto:elab.ilias@gmail.com",
            'icon' : "fa-solid fa-paper-plane",
            'content' : 'My Mail'
        },

        'linkedin' : {
            'id' : 'contact_2',
            'link' : "https://www.linkedin.com/in/ilias-el-abbassi-a161131b5/",
            'icon' : "fa-brands fa-linkedin",
            'content' : 'My LinkedIn'
        },

        'github' : {
            'id' : 'contact_3',
            'link' : "https://github.com/IliasElab",
            'icon' : "fa-brands fa-github",
            'content' : 'My Github'
        }
    }

    const render_contacts = () => {
        let elements = [];

        Object.values(contacts).forEach((element) => {
            elements.push(<li key={element.id} className="list_element"><a href={element.link}><i className={element.icon}></i> {element.content}</a></li>)
        })
        return elements;
    }

    return (
        <ul id="list_contact" className={props.animation ? 'reveal-X active' : 'reveal-X'}>
            {render_contacts()}
        </ul>
    );
};

export default Contact;