import React, { useState } from 'react';

const ThoughtForm = () => {
    return (
        <div>
            <p className="m-0">
                Character Count: 0/200
            </p>
            <form className="flex-rot justify-center justify-space-between-md align-stretch">
                <textarea placeholder="Here's a new thought..."
                    className="form-input col-12 col-md-9"></textarea>
                <button type="submit" className="btn col-12 col-md-3">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ThoughtForm;