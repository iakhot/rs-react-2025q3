import { useEffect, useRef, useState } from 'react';
import './App.css';
import ControlledForm from './components/ControlledForm';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';
import { initialData, useFormStore } from './common/store';
import Preview from './components/Preview';
import type { FormData as MyFormData } from './common/types';

function App() {
  const m1 = useRef<HTMLElement>(null);
  const m2 = useRef<HTMLElement>(null);
  const result = useFormStore((state) => state.forms);
  const controlledData =
    'controlled-form' in result ? result['controlled-form'] : initialData;
  const [initialControlledData, setInitialControlledData] =
    useState<MyFormData>(initialData);
  const [changedFields, setChangedFields] = useState<string[]>([]);

  useEffect(() => {
    const newChangedFields: string[] = [];
    for (const key in controlledData) {
      const typedKey = key as keyof MyFormData;
      if (controlledData[typedKey] != initialControlledData[typedKey]) {
        newChangedFields.push(key);
      }
    }
    setChangedFields(newChangedFields);
    setInitialControlledData(controlledData);
  }, [controlledData, initialControlledData]);

  return (
    <main className="flex min-w-[80vw] min-h-[80vh]">
      <section id="uncontrolled" className="min-w-1/2" ref={m1}>
        <Modal container={m1} title="Open Uncontrolled Form">
          <UncontrolledForm />
        </Modal>
        {'uncontrolled-form' in result ? (
          <Preview
            data={result['uncontrolled-form']}
            changedFields={changedFields}
          />
        ) : null}
      </section>
      <section id="controlled" className="min-w-1/2" ref={m2}>
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
