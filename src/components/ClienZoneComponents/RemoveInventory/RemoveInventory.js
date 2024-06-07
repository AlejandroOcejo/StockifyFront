import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeInventory } from '../../../state/inventorySlicer';
import RemoveButton from '../../CommonComponents/RemoveButton/RemoveButton';
import Switch from '../../CommonComponents/Switch/Switch';
import { useTranslation } from 'react-i18next';

const RemoveInventory = (props) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [t] = useTranslation('global');
  const dispatch = useDispatch();

  const handleClickRemove = () => {
    dispatch(removeInventory(props.id));
  };

  const handleToggle = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <div className="max-w-72 mx-auto p-5 text-sm">
      <div className="mb-4 flex justify-between items-center">
        <span>
          {t('RemoveInventory.WarningText')}
        </span>
        <span>
          <Switch isOn={isAccepted} handleToggle={handleToggle} />
        </span>
      </div>
      <RemoveButton disabled={!isAccepted} onButtonClick={handleClickRemove} label={t('RemoveInventory.RemoveButtonLabel')} />
    </div>
  );
};

export default RemoveInventory;
