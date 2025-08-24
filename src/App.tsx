import { useEffect, useRef, useState } from 'react';
import './App.css';
import ControlledForm from './components/ControlledForm';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';
import { initialData, useFormStore } from './common/store';
import Preview from './components/Preview';

function App() {
  const m1 = useRef<HTMLElement>(null);
  const m2 = useRef<HTMLElement>(null);
  const result = useFormStore((state) => state.forms);
  const controlledData =
    'controlled-form' in result ? result['controlled-form'] : initialData;
  const [initialControlledData, setInitialControlledData] =
    useState(initialData);
  const [changedFields, setChangedFields] = useState<string[]>([]);

  useEffect(() => {
    const newChangedFields = [];
    for (const key in controlledData) {
      if (controlledData[key] != initialControlledData[key]) {
        newChangedFields.push(key);
      }
    }
    setChangedFields(newChangedFields);
    setInitialControlledData(controlledData);
    console.log(`===== Changed fff ${newChangedFields.toString()}`);
  }, [controlledData, initialControlledData]);

  return (
    <main className="flex min-w-[80vw] min-h-[80vh]">
      <section id="uncontrolled" className="min-w-[48vw]" ref={m1}>
        <Modal container={m1} title="Open Uncontrolled Form">
          <UncontrolledForm />
        </Modal>
      </section>
      <section id="controlled" className="min-w-[48vw]" ref={m2}>
        <Modal container={m2} title="Open Controlled Form">
          <ControlledForm />
        </Modal>
        {'controlled-form' in result ? (
          <Preview
            data={result['controlled-form']}
            changedFields={changedFields}
          />
        ) : null}
      </section>
    </main>
  );
}

export default App;
