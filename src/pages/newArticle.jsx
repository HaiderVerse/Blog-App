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
import { useDispatch } from 'react-redux';





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
        seoScore: 0,
        writingStats: {
            wordCount: 0,
            readTime: 0,
            headings: 0,
            images: 0
        }
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
    const BLOGDATA = state.blogData;

    // Tags functionality
    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = state.tagInput.trim();
            if (newTag && !BLOGDATA.tags.includes(newTag)) {
                dispatch({
                    type: 'SET_BLOG_DATA',
                    payload: {
                        ...BLOGDATA,
                        tags: [...BLOGDATA.tags, newTag]
                    }
                });
                dispatch({ type: 'SET_TAG_INPUT', payload: '' });
            }
        }
    };
    const removeTag = (tagToRemove) => {
        dispatch({
            type: 'SET_BLOG_DATA',
            payload: {
                ...BLOGDATA,
                tags: BLOGDATA.tags.filter(tag => tag !== tagToRemove)
            }
        });
    };
    useEffect(() => {
        if (BLOGDATA.tags.length > 4) {
            tagRef.current.disabled = true
        } else {
            tagRef.current.disabled = false
        }
    }, [BLOGDATA.tags]);

    // handle image upload functionality
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
                    ...BLOGDATA,
                    featuredImage: {
                        file,
                        preview: e.target.result
                    }
                }
            })
        };
        reader.readAsDataURL(file);
    };

    // Calculate writing stats
    useEffect(() => {
        console.log("calculate writing stats");

        if (!BLOGDATA.content) return;

        const textContent = BLOGDATA.content.replace(/<[^>]*>/g, ' ');
        const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const readTime = Math.ceil(wordCount / 200);
        const headingMatches = BLOGDATA.content.match(/<h[1-6][^>]*>/gi);
        const headings = headingMatches ? headingMatches.length : 0;
        const imageMatches = BLOGDATA.content.match(/<img[^>]*>/gi);
        const images = imageMatches ? imageMatches.length : 0;

        dispatch({
            type: 'SET_BLOG_DATA',
            payload: {
                ...BLOGDATA,
                writingStats: {
                    wordCount,
                    readTime,
                    headings,
                    images
                }
            }
        });
    }, [BLOGDATA.content]);


    // helper: safe slug
    const makeSlug = (title = "") => {
        return (
            title
                .toLowerCase()
                .trim()
                // keep letters/numbers/spaces/hyphen; remove the rest (unicode friendly)
                .replace(/[^\p{L}\p{N}\s-]/gu, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
        )
    }

    useEffect(() => {
        // --- calculate slug
        const nextSlug = BLOGDATA.title ? makeSlug(BLOGDATA.title) : "";

        // --- calculate seoScore (tumhara existing logic ya jo maine diya tha)
        let score = 0;

        // Title (20)
        if (BLOGDATA.title && BLOGDATA.title.length >= 40 && BLOGDATA.title.length <= 60) score += 20;
        else if (BLOGDATA.title && BLOGDATA.title.length >= 10 && BLOGDATA.title.length <= 20) score += 10;

        // Slug (10)
        if (nextSlug.length > 10) score += 10;

        // Featured image (5)
        if (BLOGDATA.featuredImage) score += 5;

        // Content (25)
        if (BLOGDATA.content) {
            const text = BLOGDATA.content.replace(/<[^>]*>/g, " ");
            const words = text.trim().split(/\s+/).filter(Boolean);
            const wc = words.length;
            if (wc >= 800) score += 25;
            else if (wc >= 400) score += 15;
            else if (wc >= 200) score += 10;
        }

        // Category (5)
        if (BLOGDATA.category) score += 5;

        // Tags (5)
        if (BLOGDATA.tags?.length) score += 5;

        // Meta title (15)
        if (BLOGDATA.metaTitle && BLOGDATA.metaTitle.length >= 40 && BLOGDATA.metaTitle.length <= 60) score += 15;
        else if (BLOGDATA.metaTitle) score += 8;

        // Meta description (10)
        if (BLOGDATA.metaDescription && BLOGDATA.metaDescription.length >= 150 && BLOGDATA.metaDescription.length <= 160) score += 10;
        else if (BLOGDATA.metaDescription && BLOGDATA.metaDescription.length > 80) score += 5;

        // Keywords (5)
        if (BLOGDATA.metaKeywords?.length) score += 5;

        // --- dispatch only if something actually changed
        const slugChanged = nextSlug !== BLOGDATA.slug;
        const scoreChanged = score !== BLOGDATA.seoScore;

        if (slugChanged || scoreChanged) {
            dispatch({
                type: "SET_BLOG_DATA",
                payload: {
                    ...BLOGDATA,
                    slug: nextSlug,
                    seoScore: score,
                },
            });
        }
    }, [
        BLOGDATA.title,
        BLOGDATA.featuredImage,
        BLOGDATA.content,
        BLOGDATA.category,
        BLOGDATA.tags,
        BLOGDATA.metaTitle,
        BLOGDATA.metaDescription,
        BLOGDATA.metaKeywords,
        BLOGDATA.slug,
        BLOGDATA.seoScore,
    ]);



    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Blog Main Details */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Blog Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter your blog title"
                                        value={BLOGDATA.title}
                                        onChange={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...BLOGDATA,
                                                title: e.target.value
                                            }
                                        })}
                                        onBlur={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...BLOGDATA,
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
                                        value={BLOGDATA.slug}
                                        onChange={(e) => dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...BLOGDATA,
                                                slug: e.target.value
                                            }
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blog Tags and Category */}
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
                                                {BLOGDATA.category ? category.find((category) => category.value === BLOGDATA.category)?.label : "Select Category..."}
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
                                                                            ...BLOGDATA,
                                                                            category: currentValue === BLOGDATA.category ? "" : currentValue
                                                                        }
                                                                    });
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {category.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        BLOGDATA.category === category.value ? "opacity-100" : "opacity-0"
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
                                        onChange={(e) => dispatch({
                                            type: 'SET_TAG_INPUT',
                                            payload: e.target.value
                                        })}
                                        onKeyDown={handleTagInput}
                                        ref={tagRef}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {BLOGDATA.tags.map((tag) => (
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

                        {/* blog featured image */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <Label>Featured Image</Label>
                                <div
                                    className={`border-[#DDDDF8] border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors hover:bg-[#f8f9fc] ${BLOGDATA.featuredImage ? 'bg-gray-50' : 'bg-white'}`}
                                    onClick={() => fileInputRef.current.click()}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {BLOGDATA.featuredImage ? (
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
                                                                ...BLOGDATA,
                                                                featuredImage: null
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <img
                                                src={BLOGDATA.featuredImage.preview}
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

                        {/* Blog Text Editor */}
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
                                    value={BLOGDATA.content}
                                    onEditorChange={(content) => {
                                        dispatch({
                                            type: 'SET_BLOG_DATA',
                                            payload: {
                                                ...BLOGDATA,
                                                content
                                            }
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Blog SEO */}
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
                                                value={BLOGDATA.metaTitle}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...BLOGDATA,
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
                                                value={BLOGDATA.metaDescription}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...BLOGDATA,
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
                                                value={BLOGDATA.metaKeywords}
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: 'SET_BLOG_DATA',
                                                        payload: {
                                                            ...BLOGDATA,
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
                        {/* publish options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish Options</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart className="w-5 h-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-x-5 items-center">
                                <Button variant="outline" className="w-auto">
                                    <FileText className="w-4 h-4 mr-3" />
                                    My Drafts (4)
                                </Button>
                                <Button variant="outline" className="w-auto">
                                    <Archive className="w-4 h-4 mr-3" />
                                    Recent Blogs
                                </Button>
                            </CardContent>
                        </Card>

                        {/* SEO Score */}
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
                                            value={BLOGDATA.seoScore}
                                            text={`${BLOGDATA.seoScore}`}
                                            styles={{
                                                path: {
                                                    // stroke: getSeoColor(seoScore),
                                                    stroke: '#f03da7',
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

                        {/* Writing Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <File className="w-5 h-5" />
                                    Writing Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-muted rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold">{BLOGDATA.writingStats.wordCount}</div>
                                        <div className="text-sm text-muted-foreground">Words</div>
                                    </div>
                                    <div className="bg-muted rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold">{BLOGDATA.writingStats.readTime} min</div>
                                        <div className="text-sm text-muted-foreground">Read Time</div>
                                    </div>
                                    <div className="bg-muted rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold">{BLOGDATA.writingStats.headings}</div>
                                        <div className="text-sm text-muted-foreground">Headings</div>
                                    </div>
                                    <div className="bg-muted rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold">{BLOGDATA.writingStats.images}</div>
                                        <div className="text-sm text-muted-foreground">Images</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Image Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" />
                                    Featured Image Guidelines
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p className="mb-3">For best results, follow these guidelines:</p>
                                    <ul className="space-y-2 list-disc pl-5">
                                        <li>Use high-quality images (min 1200px width)</li>
                                        <li>Maintain 16:9 aspect ratio</li>
                                        <li>File size under 2MB (JPG or PNG)</li>
                                        <li>Include relevant text overlay when needed</li>
                                        <li>Avoid copyrighted images</li>
                                        <li>Ensure proper contrast with text</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}
