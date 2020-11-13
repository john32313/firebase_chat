import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  contactsSelector,
  conversationsListSelector,
  userSelector,
} from '../store/selectors';
import {
  subscribeContactsAction,
  subscribeConversationsList,
  unsubscribeContactsAction,
} from '../store/actions';
import Contact from '../components/Contact';
import MessageBubble from '../components/MessageBubble';

function ContactList() {
  const user = useSelector(userSelector);
  const contacts = useSelector(contactsSelector);
  const conversationsList = useSelector(conversationsListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeContactsAction());
    dispatch(subscribeConversationsList());

    return () => {
      dispatch(unsubscribeContactsAction());
    };
  }, []);

  return (
    <ul className="divide-y-2 divide-opacity-50 divide-red-600 bg-red-200 border-r-2 border-red-600 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 h-screen overflow-y-auto p-2">
      {conversationsList.map((convo) => {
        // First contact that isn't the current user
        const contactUid = convo.userList.find((uid) => uid !== user.uid);
        const contact = contacts.find((c) => c.uid === contactUid);

        return (
          <li key={convo.uid_conv}>
            <Contact
              name={contact.displayName}
              image={contact.photoURL}
              isOnline={contact.isOnline}
              unreadCount={convo.unread}
              link={`/messages/${convo.uid_conv}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

function Messages() {
  return (
    <ul className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-screen overflow-y-auto p-3">
      <li className="my-1">
        <MessageBubble
          name="Jean Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Marie Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf={false}
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Marie Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf={false}
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Marie Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf={false}
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Marie Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf={false}
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Jean Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf
        />
      </li>
      <li className="my-1">
        <MessageBubble
          name="Marie Dupont"
          message="Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique."
          isSelf={false}
        />
      </li>
    </ul>
  );
}

function MessagesPage() {
  return (
    <main className="flex">
      <ContactList />
      <Route path="/messages/:convoUid">
        <Messages />
      </Route>
    </main>
  );
}

export default MessagesPage;
