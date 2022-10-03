import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_REACTION } from '../../utils/mutations';

function ReactionForm({ thoughtId }) {
    const CHARACTER_MAX = 200;
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = event => {
        if (event.target.value.length <= CHARACTER_MAX) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addReaction({
                variables: { thoughtId, reactionBody }
            });

            setBody('');
            setCharacterCount(0);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === CHARACTER_MAX || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/{CHARACTER_MAX}
                {error && <span className="ml-2">- Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                    style={{ height: "100px" }}
                    value={reactionBody}
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ReactionForm;