import { memo, FC, ReactNode, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Page } from '../../enums';
import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import { DEFAULT_TABLE_VIEW } from '../../reducers/tableViewsReducer';
import { BaseProps, FieldData } from '../../types';
import { humanizeText } from '../../utils/common';
import ModelNav from '../ModelNav';

import ModelIndexTable from './ModelIndexTable';

import ModelTable from '../../__components__/ModelTable';
import ModelTableBody from '../../__components__/ModelTableBody';
import ModelTableRow from '../../__components__/ModelTableRow';
import ModelTableCell from '../../__components__/ModelTableCell';
import { SetModelFieldDisplaysContext } from '../../__contexts__/ModelFieldDisplaysContext';

interface ModelIndexProps extends BaseProps {
  modelName: string;
  fields: string[];
  title?: string | JSX.Element;
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  children?: ReactNode;
}

const ModelIndex = ({
  id,
  className,
  modelName,
  fields,
  title = humanizeText(modelName),
  fieldsData,
  editable = true,
  deletable = true,
  children,
}: ModelIndexProps) => {
  // Will save onto some storage and retrieve the tableView in the future
  useTableView({
    modelName,
    tableView: JSON.parse(JSON.stringify(DEFAULT_TABLE_VIEW)),
  });

  const x = [
    {
      id: 1,
      stringField: 'world',
      intField: 13,
      floatField: 11.11,
      booleanField: true,
      datetimeField: new Date().toISOString(),
    },
    {
      id: 2,
      stringField: 'monkey',
      intField: 7,
      floatField: 7.7,
      booleanField: false,
      datetimeField: new Date().toISOString(),
    },
  ];
  return (
    <Container id={id} className={className}>
      <ModelTable
        data={x}
        fields={[
          'stringField',
          'intField',
          'floatField',
          'booleanField',
          'datetimeField',
        ]}
      >
        <ModelTableBody>
          <ModelTableRow>
            <ModelTableCell field={'intField'}>Nooo way</ModelTableCell>
            <ModelTableCell field={'booleanField'}>
              <Hello />
            </ModelTableCell>
          </ModelTableRow>
        </ModelTableBody>
      </ModelTable>
    </Container>
  );
  // return (
  //   <Container id={id} className={className}>
  //     {children ?? (
  //       <>
  //         <div id={id} className={`${PACKAGE_ABBR}-model-title`}>
  //           <h2>{title}</h2>
  //           {/* TODO: Filter under construction */}
  //           <ModelNav modelName={modelName} modelId={Page.CREATE}>
  //             <Button>Create</Button>
  //           </ModelNav>
  //         </div>
  //         <ModelIndexTable
  //           modelName={modelName}
  //           fields={fields}
  //           fieldsData={fieldsData}
  //           editable={editable}
  //           deletable={deletable}
  //         />
  //       </>
  //     )}
  //   </Container>
  // );
};

export default memo(ModelIndex) as FC<ModelIndexProps>;

const Hello = () => {
  const stc = useContext(SetModelFieldDisplaysContext);

  return (
    <Button
      onClick={() => {
        stc((prev) => {
          return { ...prev, intField: 'Yessir' };
        });
      }}
    ></Button>
  );
};
