import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { authWrapper } from './AuthWrapper';
import { ValidatedForms } from '../forms/ValidatedForms';

export const AuthPrompt = withRouter(
  authWrapper(
    // eslint-disable-next-line react/display-name
    class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          errorMessage: null,
        };
        this.defaultAttrs = { type: 'text', required: true };
        this.formModel = [
          { label: 'Username', attrs: { defaultValue: 'admin' } },
          { label: 'Password', attrs: { type: 'password' } },
        ];
      }

      authenticate = credentials => {
        this.props
          .authenticate(credentials)
          .catch(err => this.setState({ errorMessage: err.message }))
          .then(this.props.history.push('/admin'));
      };

      render() {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col bg-dark text-white">
                <div className="navbar-brand">SPORT STORE</div>
              </div>
            </div>

            <div className="row">
              <div className="col m-2">
                {this.state.errorMessage != null && (
                  <h4 className="bg-danger text-center text-white m-1 p-2">
                    {this.state.errorMessage}
                  </h4>
                )}
                <ValidatedForms
                  formModel={this.formModel}
                  defaultAttrs={this.defaultAttrs}
                  submitCallback={this.authenticate}
                  cancelCallback={() => this.props.history.push('/')}
                  submitText="Login"
                  cancelText="Cancel"
                />
              </div>
            </div>
          </div>
        );
      }
    }
  )
);
