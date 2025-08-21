import React, { useEffect, useState, useRef, useReducer } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {
    Check,
    ChevronsUpDown,
    Save,
    Send,
    Calendar,
    Upload,
    X,
    ChevronDown,
    FileText,
    Archive,
    BarChart,
    Image as ImageIcon,
    File,
    Search,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import Icons from '@/components/icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';





const category = [
    {
        value: "technology",
        label: "Technology",
    },
    {
        value: "design",
        label: "Design",
    },
    {
        value: "business",
        label: "Business",
    },
    {
        value: "lifestyle",
        label: "Lifestyle",
    },
    {
        value: "astro",
        label: "Astro",
    },
]
const initialState = {
    blogData: {
        title: '',
        slug: '',
        category: '',
        tags: [],
        featuredImage: null,
        content: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
    },
    tagInput: '',

};
export default function newArticle() {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_BLOG_DATA':
                return { ...state, blogData: action.payload };
            case 'SET_TAG_INPUT':
                return { ...state, tagInput: action.payload };
            default:
                return state;
        }
    }, initialState);
    const [open, setOpen] = useState(false);
    const [isSeoOpen, setIsSeoOpen] = useState(true);

    const fileInputRef = useRef(null);
    const tagRef = useRef(null);

    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = state.tagInput.trim();
            if (newTag && !state.blogData.tags.includes(newTag)) {
                dispatch({
                    type: 'SET_BLOG_DATA',
                    payload: {
                        ...state.blogData,
                        tags: [...state.blogData.tags, newTag]
                    }
                });
                dispatch({ type: 'SET_TAG_INPUT', payload: '' });
            }
            if (state.blogData.tags.length >= 4) {
                tagRef.current.disabled = true
            }
        }
    };

    const removeTag = (tagToRemove) => {
        if (state.blogData.tags.length <= 4) {
            tagRef.current.disabled = false
        }
        dispatch({
            type: 'SET_BLOG_DATA',
            payload: {
                ...state.blogData,
                tags: state.blogData.tags.filter(tag => tag !== tagToRemove)
            }
        });
    };
    // Generate slug from title
    useEffect(() => {
        if (state.blogData.title) {
            const slug = state.blogData.title
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-');
            dispatch({
                type: 'SET_BLOG_DATA',
                payload: {
                    ...state.blogData,
                    slug
                }
            })
        }
    }, [state.blogData.title]);

    const handleImageUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        processFile(file)
    }
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]
        processFile(file)
    }
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

    const processFile = (file) => {
        if (!file) return;
        console.log(file);

        // check file type
        if (!file.type.startsWith("image/")) {
            alert("Only image files are allowed!");
            return;
        }

        // check file size
        if (file.size > MAX_FILE_SIZE) {
            alert("File is too large! Max allowed size is 1MB.");
            return;
        }

        // read file if valid
        const reader = new FileReader();
        reader.onload = (e) => {
            dispatch({
                type: "SET_BLOG_DATA",
                payload: {
                    ...state.blogData,
                    featuredImage: {
                        file,
                        preview: e.target.result
                    }
                }
            })
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Blog Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter your blog title"
                                        value={state.blogData.title}
                                        onChange={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...state.blogData,
                                                title: e.target.value
                                            }
                                        })}
                                        onBlur={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...state.blogData,
                                                title: e.target.value.trim()
                                            }
                                        })}
                                        className={"!bg-white"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug / URL</Label>
                                    <Input
                                        id="slug"
                                        placeholder="your-blog-url"
                                        value={state.blogData.slug}
                                        onChange={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...state.blogData,
                                                slug: e.target.value
                                            }
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[300px] justify-between"
                                            >
                                                {state.blogData.category ? category.find((category) => category.value === state.blogData.category)?.label : "Select Category..."}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search Category..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>No Category found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {category.map((category) => (
                                                            <CommandItem
                                                                key={category.value}
                                                                value={category.value}
                                                                onSelect={(currentValue) => {
                                                                    dispatch({
                                                                        type: 'SET_BLOG_DATA',
                                                                        payload: {
                                                                            ...state.blogData,
                                                                            category: currentValue === state.blogData.category ? "" : currentValue
                                                                        }
                                                                    });
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {category.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        state.blogData.category === category.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input
                                        id="tags"
                                        placeholder="Add tags (press Enter or comma)"
                                        value={state.tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagInput}
                                        ref={tagRef}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {state.blogData.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="px-3 py-1 gap-x-[6px] rounded-full bg-accent-background text-primary-secondary"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => removeTag(tag)}
                                                    className=" hover:text-gray-200"
                                                >
                                                    <X className="w-3 h-3 text-primary-secondary" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <Label>Featured Image</Label>
                                <div
                                    className={`border-[#DDDDF8] border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors hover:bg-[#f8f9fc] ${state.blogData.featuredImage ? 'bg-gray-50' : 'bg-white'}`}
                                    onClick={() => fileInputRef.current.click()}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {state.blogData.featuredImage ? (
                                        <div className="relative">
                                            <div className="absolute top-2 right-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full bg-white/80 hover:bg-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch({
                                                            type: 'SET_BLOG_DATA',
                                                            payload: {
                                                                ...state.blogData,
                                                                featuredImage: null
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <img
                                                src={state.blogData.featuredImage.preview}
                                                alt="Preview"
                                                className="max-h-60 rounded-lg object-cover mx-auto"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className='w-max mx-auto'>
                                                <Icons type="boxImage" width='100px' height='81px' />
                                            </div>
                                            <p className="text-black text-xl">Drop, Upload or Paste Images</p>
                                            <Button
                                                variant="outline"
                                                className="mt-2 cursor-pointer"
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Browse
                                            </Button>
                                            <p className="text-xs text-muted-foreground mt-3">Recommended: 1200x630px • Max 1MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        max={2000}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Blog Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <Editor
                                    apiKey='0cvkxyteun463ieksrnv296gar48j1rm8depfa4wcowgmwem'
                                    init={{
                                        branding: false,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
                                        font_size_formats: '10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14pt, }'
                                    }}
                                    value={state.blogData.content}
                                    onEditorChange={(content) => {
                                        dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...state.blogData,
                                                content
                                            }
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <Collapsible open={isSeoOpen} onOpenChange={setIsSeoOpen}>
                                <CardHeader className="py-4 cursor-pointer grid-rows-[auto]">
                                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                                        <CardTitle className="flex items-center gap-2">
                                            <Search className="w-5 h-5" />
                                            SEO Settings
                                        </CardTitle>
                                        <ChevronDown className={`w-5 h-5 transition-transform ${isSeoOpen ? 'rotate-180' : ''}`} />
                                    </CollapsibleTrigger>
                                </CardHeader>
                                <CollapsibleContent>
                                    <CardContent className="pt-0 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="metaTitle">Meta Title</Label>
                                            <Input
                                                id="metaTitle"
                                                placeholder="SEO title for search engines"
                                                value={state.blogData.metaTitle}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...state.blogData,
                                                            metaTitle: e.target.value
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="metaDescription">Meta Description</Label>
                                            <Textarea
                                                id="metaDescription"
                                                placeholder="Brief description for search results"
                                                value={state.blogData.metaDescription}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...state.blogData,
                                                            metaDescription: e.target.value
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="metaKeywords">Keywords</Label>
                                            <Input
                                                id="metaKeywords"
                                                placeholder="Comma separated keywords"
                                                value={state.blogData.metaKeywords}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...state.blogData,
                                                            metaKeywords: e.target.value
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    </div>
                    {/* Sidebar */}
                    <div className="space-y-6 sticky top-5 self-start">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish Options</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex gap-2 cursor-pointer"
                                        onClick={() => handleSubmit('draft')}
                                    >
                                        <Save className="w-6 h-6" />
                                        <span>Save Draft</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex gap-2 cursor-pointer"
                                        onClick={() => handleSubmit('schedule')}
                                    >
                                        <Calendar className="w-6 h-6" />
                                        <span>Schedule</span>
                                    </Button>
                                    <Button
                                        className="flex gap-2 cursor-pointer bg-gradient-to-r from-[#5CD2E7] to-[#F03DA7] text-white hover:opacity-90"
                                        onClick={() => handleSubmit('publish')}
                                    >
                                        <Send className="w-6 h-6" />
                                        <span>Publish Now</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart className="w-5 h-5" />
                                    SEO Score
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex items-center justify-center'>
                                    <div className='w-[200px]'>

                                        <CircularProgressbar
                                            value={75}
                                            text={`75`}
                                            styles={{
                                                path: {
                                                    // stroke: getSeoColor(seoScore),
                                                    stroke: 'blue',
                                                    strokeLinecap: 'round',
                                                },
                                                trail: {
                                                    stroke: '#e5e7eb',
                                                },
                                                text: {
                                                    fill: '#4b5563',
                                                    fontSize: '28px',
                                                    fontWeight: 'bolder',
                                                    fontFamily: 'cursive, sans-serif',
                                                    dominantBaseline: 'central',
                                                    lineHeight: '1'
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}
