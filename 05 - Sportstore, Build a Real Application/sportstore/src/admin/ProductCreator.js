import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ValidatedForms } from '../forms/ValidatedForms';
import { storeProduct, updateProduct } from './clientMutations';

export class ProductCreator extends Component {
  constructor(props) {
    super(props);
    this.defaultAttrs = { type: 'text', required: true };
    this.formModel = [
      { label: 'Name' },
      { label: 'Category' },
      { label: 'Description' },
      { label: 'Price', attrs: { type: 'number', step: '0.01' } },
    ];
    // The component will initially intended for creating a new product.
    this.mutation = storeProduct;
    // And if the prop's mode is "edit", then fill the input fields with previous values.
    if (this.props.mode === 'edit') {
      this.mutation = updateProduct;
      this.formModel = [
        { label: 'ID', attrs: { disabled: true } },
        ...this.formModel,
      ].map(item => ({
        ...item,
        attrs: {
          ...item.attrs,
          defaultValue: this.props.product[item.label.toLowerCase()],
        },
      }));
    }
  }

  navigate = () => this.props.history.push('/admin/products');

  render() {
    return (
      <div className="container-fluid">
        <div className="col m-2">
          <Mutation mutation={this.mutation}>
            {(saveMutation, { client }) => (
              <ValidatedForms
                formModel={this.formModel}
                defaultAttrs={this.defaultAttrs}
                submitCallback={data => {
                  saveMutation({
                    variables: {
                      product: {
                        ...data,
                        price: Number(data.price),
                      },
                    },
                  });
                  if (this.props.mode !== 'edit') client.resetStore();
                  this.navigate();
                }}
                cancelCallback={this.navigate}
                submitText="Save"
                cancelText="Cancel"
              />
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
