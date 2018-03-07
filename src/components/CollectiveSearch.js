'use strict';

import React from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';

// TODO: Make this dynamically resolved
const COLLECTIONS_API_ENDPOINT = 'http://localhost:8080/collectives';

const ADDITIONAL_ATTRIBS = ['description',
                            'website']

const stringOrNode = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
]);

class CollectiveOption extends React.Component {
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }

    render () {
        // TODO: Have this in a CSS file
        const iconStyle = {
            borderRadius: 3,
            display: 'inline-block',
            height: '1.1em',
            marginRight: 10,
            position: 'relative',
            top: -1,
            verticalAlign: 'middle',
        };

        return (
            <div
                className={this.props.className}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                title={this.props.option.title}>
                <img src={this.props.option.value.image} style={iconStyle} />
                {this.props.children}
            </div>
        );
    }
}

CollectiveOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
};


class CollectiveValue extends React.Component {
    render () {
        // TODO: Have this in a CSS file
        const iconStyle = {
            borderRadius: 3,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -1,
            height: '1.1em',
            verticalAlign: 'middle',
        };

        console.info(this.props.value);

        return (
            <div className="Select-value" title={this.props.value.title}>
                <span className="Select-value-label">
                    <img src={this.props.value.value.image} style={iconStyle} />
                    {this.props.children}
                </span>
            </div>
        );
    }
}

CollectiveValue.propTypes = {
    children: PropTypes.node,
    placeholder: stringOrNode,
    value: PropTypes.object,
}

export default class CollectiveSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            value: '',
        };
    }

    setValue (value) {
        console.info(`Value set: ${value}`);
        this.setState({ value });
    }

    arrowRenderer () {
        return <span>+</span>;
    }

    getCollections (input, callback) {
        this.setState({ isLoading: true });

        let queryString = new URLSearchParams()
        queryString.append('filter', input);

        console.info(`Searching for ${input}...`);
        return fetch(`${COLLECTIONS_API_ENDPOINT}?${queryString.toString()}`)
        .then(responseRaw => responseRaw.json())
        .then(results => {
            const options = results.map(collective => {
                // Format the visible label
                let label = `${collective.name}`
                ADDITIONAL_ATTRIBS.forEach(attribName => {
                    if (collective[attribName]) {
                        label += ` / ${collective[attribName]}`;
                    }
                });

                return {
                    value: collective,
                    label: label,
                };
            });

            console.info(`Got ${options.length} results`);

            this.setState({ isLoading: false });

            callback(null, { options: options, complete: true });
        });
    }

    render () {
        const placeholder = <span>Find Collective</span>;

        return (
            <div className="section">
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Find your collection</h1>
                        <p class="lead">This is a test example of API-based filtering for a big list.</p>
                    </div>
                </div>

                <h3 className="section-heading mb-3">
                    Enter your query:
                </h3>

                <Select.Async
                    arrowRenderer={this.arrowRenderer.bind(this)}
                    autoFocus={true}
                    cache={false}
                    isLoading={this.state.isLoading}
                    loadOptions={this.getCollections.bind(this)}
                    onChange={this.setValue.bind(this)}
                    optionComponent={CollectiveOption}
                    placeholder={placeholder}
                    trimFilter={true}
                    value={this.state.value}
                    valueComponent={CollectiveValue}
                />
            </div>
        );
    }
}

CollectiveSearch.propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string,
};
