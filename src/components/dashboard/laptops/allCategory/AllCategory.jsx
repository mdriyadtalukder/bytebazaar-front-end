
import Loading from "../../../loading/Loading";
import SingleProduct from "./SingleProduct";

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux";
import { getAModel, getGeneration, getMemory, getModels, getRam, getSSD, getSeries, getType } from "../../../../RTK-Query/features/allProduct/allProductSlice";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AllCategory = ({ data, isError, isLoading, error, filtering, model }) => {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const { processor_Type, processor_Generation, ram_Options, ssd_Options, graphicsMemory_Options, laptopSeries_Options, oneModel, models } = useSelector(state => state.allProduct);
    const dispatch = useDispatch();
    const filters = filtering || undefined;
    const series = filters?.filter(f => f?.id === 'laptopSeriesOptions');
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.filter((d) => {
            if (processor_Type.length > 0) {
                return processor_Type.includes(d?.productProcessor?.processorType);
            }
            else {
                return true;
            }
        })
            .filter((d) => {

                if (processor_Generation.length > 0) {
                    return processor_Generation.includes(d?.productProcessor?.processorGeneration);
                }
                else {
                    return true;
                }

            }).filter((d) => {

                if (ram_Options.length > 0) {
                    return ram_Options.includes(d?.productMemory?.ram);
                }
                else {
                    return true;
                }

            }).filter((d) => {

                if (ssd_Options.length > 0) {
                    return ssd_Options.includes(d?.productStorage?.storage.split(' ')[0]);
                }
                else {
                    return true;
                }

            }).filter((d) => {

                if (graphicsMemory_Options.length > 0) {
                    return graphicsMemory_Options.includes(d?.productGraphics?.graphicsMemory);
                }
                else {
                    return true;
                }

            }).filter((d) => {

                if (laptopSeries_Options.length > 0) {
                    return laptopSeries_Options.includes(d?.productGeneral?.productLaptopSeries);
                }
                else {
                    return true;
                }
            }).filter((d) => {

                if (models.length > 0 && !models.includes('All')) {
                    return models.includes(d?.productGeneral?.productBrand);
                }
                else {
                    return true;
                }
            })
            .filter((d) => {

                if (oneModel && oneModel !== 'All') {
                    return d?.productGeneral?.productBrand === oneModel;
                }
                else {
                    return true;
                }
            })
            ?.map((d) => <SingleProduct key={d?._id} d={d}></SingleProduct>)
    }
    return (
        <>
            {isLoading ? <Loading></Loading> :
                <div className="bg-indigo-100 w-full h-full">
                    <div>
                        {/* Mobile filter dialog */}
                        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-40 flex">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                            <div className="flex items-center justify-between px-4">
                                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                                <button
                                                    type="button"
                                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                    onClick={() => setMobileFiltersOpen(false)}
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {/* Filters */}
                                            <form className="mt-4 border-t border-gray-200">


                                                {filters?.map((section) => (
                                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                        {({ open }) => (
                                                            <>
                                                                <h3 className="-mx-2 -my-3 flow-root">
                                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                                        <span className="ml-6 flex items-center">
                                                                            {open ? (
                                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                            ) : (
                                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                            )}
                                                                        </span>
                                                                    </Disclosure.Button>
                                                                </h3>
                                                                <Disclosure.Panel className="pt-6">
                                                                    <div className="space-y-6">
                                                                        {section.options?.map((option, optionIdx) => (
                                                                            <div key={option.value} className="flex items-center">
                                                                                <input
                                                                                    onClick={(e) => {
                                                                                        if (section?.name === "Processor Type") {
                                                                                            dispatch(getType(e.target.value))
                                                                                        }
                                                                                        else if (section?.name === "Processor Generation") {
                                                                                            dispatch(getGeneration(e.target.value))
                                                                                        }
                                                                                        else if (section?.name === "RAM") {
                                                                                            dispatch(getRam(e.target.value))
                                                                                        }
                                                                                        else if (section?.name === "Solid-State Drive (SSD)") {
                                                                                            dispatch(getSSD(e.target.value))
                                                                                        }
                                                                                        else if (section?.name === "Graphics Memory") {
                                                                                            dispatch(getMemory(e.target.value))
                                                                                        }
                                                                                        else {
                                                                                            if (model) {
                                                                                                dispatch(getModels(e.target.value))
                                                                                            }
                                                                                            else {
                                                                                                dispatch(getSeries(e.target.value))
                                                                                            }
                                                                                        }


                                                                                    }}
                                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    name={`${section.id}[]`}
                                                                                    defaultValue={option.label}
                                                                                    type="checkbox"
                                                                                    defaultChecked={option.checked}
                                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                                />
                                                                                <label
                                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                                >
                                                                                    {option.label}
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                ))}
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 lg:ps-2">
                            <div className="flex items-baseline justify-between border-b border-gray-200  pt-2">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                        onClick={() => setMobileFiltersOpen(true)}
                                    >
                                        <span className="sr-only">Filters</span>
                                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <section aria-labelledby="products-heading" className="pt-6">
                                <h2 id="products-heading" className="sr-only">
                                    Products
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-6">
                                    {/* Filters */}
                                    <form className="hidden lg:block bg-base-100 p-4 mb-16 rounded-lg">


                                        {filters?.map((section) => (
                                            <Disclosure as="div" key={section.id} className={`border-b lg:${section?.name === 'Color' && 'hidden'}  border-gray-200 py-6`}>
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options?.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input onClick={(e) => {
                                                                            if (section?.name === "Processor Type") {
                                                                                dispatch(getType(e.target.value))
                                                                            }
                                                                            else if (section?.name === "Processor Generation") {
                                                                                dispatch(getGeneration(e.target.value))
                                                                            }
                                                                            else if (section?.name === "RAM") {
                                                                                dispatch(getRam(e.target.value))
                                                                            }
                                                                            else if (section?.name === "Solid-State Drive (SSD)") {
                                                                                dispatch(getSSD(e.target.value))
                                                                            }
                                                                            else if (section?.name === "Graphics Memory") {
                                                                                dispatch(getMemory(e.target.value))
                                                                            }
                                                                            else {
                                                                                if (model) {
                                                                                    dispatch(getModels(e.target.value))
                                                                                }
                                                                                else {
                                                                                    dispatch(getSeries(e.target.value))
                                                                                }
                                                                            }


                                                                        }}
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.label}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>

                                    {/* Product grid */}
                                    <div className="lg:col-span-5">
                                        <div className="text-center hidden lg:block">
                                            <ul className="menu menu-horizontal px-1">
                                                {
                                                    series && series[0]?.options?.map(s => <li onClick={() => {
                                                        if (model) {
                                                            dispatch(getAModel(s?.label))
                                                        }
                                                        else {
                                                            dispatch(getSeries(s?.label))
                                                        }
                                                    }} key={s?.value} className='me-2 font-bold'><p >{s?.label}</p></li>)
                                                }
                                                {/* <li className='bg-indigo-400 rounded-md font-bold text-white me-2' ><p>Home</p></li> */}

                                            </ul>
                                        </div>
                                        <section className="flex flex-col justify-center w-full min-h-screen px-4 py-10 mx-auto sm:px-6 bg-indigo-100 ">
                                            <div className="flex flex-wrap -mx-4">
                                                {content}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>}

        </>

    );
};

export default AllCategory;
