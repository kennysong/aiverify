import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from 'src/components/iconButton';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles/canvas.module.css';

const GRID_ITEM_CLASSNAME = 'aiv-report-widget';
const CANVAS_PAD = 10; // this value must be the same as css var --A4-canvas-padding

type SelectedGridActionButtonsProps = {
  el : HTMLDivElement
  hideEditBtn?: boolean,
  onDeleteClick: () => void,
  onEditClick: () => void,
}

function SelectedGridActionButtons(props: SelectedGridActionButtonsProps) {
  const { el , hideEditBtn = false, onDeleteClick, onEditClick } = props;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const width = el.style.width;
  const matrix = new DOMMatrixReadOnly(getComputedStyle(el).getPropertyValue('transform'));
  const top = `${matrix.m42 + CANVAS_PAD}px`;
  const left = `${matrix.m41 + CANVAS_PAD}px`;

  function handleTransitionStarted() {
    el.addEventListener('transitionend', handleTransitionEnd);
    setIsTransitioning(true);
  }

  function handleTransitionEnd() {
    el.removeEventListener('transitionstart', handleTransitionStarted);
    setIsTransitioning(false);
  }

  useEffect(() => {
    // transition handling - for grid 'dragstop' use case where grid item animates to snap to grid line. 
    // Only draw when transition to grid line is done.
    el.addEventListener('transitionstart', handleTransitionStarted);
    return () => {
      el.removeEventListener('transitionstart', handleTransitionStarted);
    }
  }, []);

  if (el.tagName.toLowerCase() !== 'div' && !el.classList.contains(GRID_ITEM_CLASSNAME)) {
    console.error('Action buttons not drawn - INVALID-GRID-ITEM');
    return null;
  }

  return isTransitioning ? null : 
    <div id="gridItemActionMenu"
      className={styles.gridItem_menu}
      style={{ top, left: `calc(${left} + ${width} + 5px)`}}>
        <IconButton
          iconComponent={DeleteIcon}
          noOutline
          onClick={onDeleteClick} />
        {!hideEditBtn ? <IconButton
          iconComponent={EditIcon}
          noOutline
          onClick={onEditClick} /> : null}
    </div>
}

export { SelectedGridActionButtons };