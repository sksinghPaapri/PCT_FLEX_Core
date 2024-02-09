import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useFieldArray } from 'react-hook-form';
import LineTextField from '../flexField/LineTextField';
import LineDateField from '../flexField/LineDateField';
import LineSelectField from '../flexField/LineSelectField';
import LineCheckboxField from '../flexField/LineCheckboxField';
import LineNumberField from '../flexField/LineNumberField';
import LineDecimal128Field from '../flexField/LineDecimal128Field';

export default function LineContent({ model, fieldList, control, errors, register, changeHandler, blurHandler }) {
    console.log(model)
    const { append, remove, fields } = useFieldArray({ control, name: model });
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th style={{ minWidth: "1rem", maxWidth: "1rem" }}>#</th>
                    <th style={{ minWidth: "1rem", maxWidth: "1rem" }}></th>
                    {fieldList?.map((field, index) => {
                        return <th key={field.label + index} style={{ minWidth: "16rem" }}>{field.label}</th>
                    })}

                </tr>
            </thead>
            <tbody>
                {
                    fields.map((field, index) => {
                        return <tr key={field.id}>
                            <td><Button size='sm' variant='secondary' onClick={() => (remove(index))}><BsTrash /></Button></td>
                            <td style={{ textAlign: 'center', paddingTop: '8px' }}>{index}</td>
                            {
                                fieldList?.map((field, subIndex) => {
                                    console.log(field)
                                    switch (field.type) {
                                        case 'String':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineTextField model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'Long String':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineTextField model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'Number':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineNumberField model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'Decimal':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineDecimal128Field model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'App':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineSelectField model={model} control={control} field={field} index={index} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'Date':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineDateField model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        case 'Boolean':
                                            return <td key={field.schemaId + subIndex}>
                                                <LineCheckboxField model={model} field={field} index={index} register={register} errors={errors} changeHandler={changeHandler} blurHandler={blurHandler} />
                                            </td>
                                        default:
                                            return <td key={field.schemaId + subIndex}> <h4>No Content</h4></td>
                                    }
                                })
                            }

                        </tr>
                    })
                }
                <tr>
                    <td colSpan="12">
                        <Button size="sm" style={{ minWidth: "6rem" }} onClick={() => append({})} >Add a line</Button>
                    </td>
                </tr>
            </tbody>

        </Table>
    )
}
