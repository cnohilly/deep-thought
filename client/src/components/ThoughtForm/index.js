import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
    const CHARACTER_MAX = 200;
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {

            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
                });
            } catch (e) {
                console.warn("First thought insertion by user!")
            }

            try {
                // update thought array's cache
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought, ...thoughts] },
                });
            } catch (error) {
                console.warn("Homepage has not been loaded");
            }
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= CHARACTER_MAX) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addThought({
                variables: { thoughtText }
            });

            setText('');
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
                    placeholder="Here's a new thought..."
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    style={{ height: "100px" }}
                    onChange={handleChange}
                ></textarea>
                <button type="submit" className="btn col-12 col-md-3">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ThoughtForm;