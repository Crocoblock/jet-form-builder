export default function ActionModal( {
										 onRequestClose,
										 children,
										 title,
										 onUpdateClick,
										 onCancelClick } ) {

	const {
		Button,
		ButtonGroup,
		Modal
	} = wp.components;

	return <Modal
		onRequestClose={ onRequestClose }
		className={ 'jet-form-edit-modal' }
		style={ { width: '60vw' } }
		title={ title }
	>
		{ ! children && <div
			className="jet-form-edit-modal__content"
		>
			{ 'Action callback is not found.' }
		</div> }
		{ children && <div>
			<div className="jet-form-edit-modal__content">
				{ children }
			</div>
			<ButtonGroup
				className="jet-form-edit-modal__actions"
			>
				<Button
					isPrimary
					onClick={ onUpdateClick }
				>Update</Button>
				<Button
					isSecondary
					style={ {
						margin: '0 0 0 10px'
					} }
					onClick={ onCancelClick ? onCancelClick : onRequestClose }
				>Cancel</Button>
			</ButtonGroup>
		</div> }
	</Modal>;
}