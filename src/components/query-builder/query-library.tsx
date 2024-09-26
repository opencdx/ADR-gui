import { useDeleteQuery, useListQueries } from '@/hooks/hooks';
import { useQueryStore } from '@/lib/store';
import { errorToast, successToast } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from 'ui-library';
import { DeleteIcon, EditIcon } from '../icons';

export default function QueryLibrary() {

  const { query, queryList, updateQueryStore, updateQueryListStore, resetQueryStore } = useQueryStore();
  const { mutate: deleteQuery, error } = useDeleteQuery();
  const { data: queries } = useListQueries();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({ defaultOpen: false });
  const [queryId, setQueryId] = useState<number | null>(null);
  const [queryName, setQueryName] = useState<string | null>(null);

  const getQueryList = useEffect(() => {
    if (queries) {
      updateQueryListStore(queries.data);
    }
  }, [queries]);

  const deleteWarning = (index: number, name: string) => {
    setQueryId(index);
    setQueryName(name);
  };

  const runDeleteQuery = async () => {
    deleteQuery(queryId!, {
      onSuccess: () => {
        successToast("Query " + queryName + " Successfully Deleted!")

        const updatedQueries = { ...queries };
        updatedQueries.data?.splice(updatedQueries.data?.map(function (query) { return query.id }).indexOf(queryId!), 1);
        updateQueryListStore(updatedQueries.data!);
        if (query.id == queryId) {
          resetQueryStore();
        }
        onClose();
      },
      onError: (error) => {
        errorToast(error?.message);
      }
    });
  };

  const loadQuery = async (id: number) => {
    const loadedQueries = queryList.find(element => element.id === id)!;
    updateQueryStore(loadedQueries);
  };

  return (
    <>
      <h1>Query Library</h1>
      {queryList?.map((query, index) => {
        return (
          <div className='mt-auto w-full justify-between flex' key={index}>
            <p className='max-w-xs p-3'>{query.name}</p>
            <div className='my-auto'>
              <div className='float-right'>
                <Button endContent={<DeleteIcon />} isIconOnly className='text-blue-500 bg-transparen'
                  onClick={() => deleteWarning(query.id!, query.name!)} onPress={onOpen} />
              </div>
              <div className='float-right'>
                <Button endContent={<EditIcon />} isIconOnly className='text-blue-500 bg-transparen'
                  onClick={() => loadQuery(query.id!)} />
              </div>
            </div>
          </div>

        )
      },)

      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete Query</ModalHeader>
          <ModalBody><div>Delete <b>{queryName}</b>?</div> This action can not be undone.
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose} variant='bordered'>Cancel</Button>
            <Button onClick={() => runDeleteQuery()} color='danger'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}